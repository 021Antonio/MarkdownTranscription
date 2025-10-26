'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import Page from '@atoms/Page';

const Pages = styled.div`
  display: grid;
  justify-content: center;
  gap: 18px;
  padding: 8px 0 40px;
`;

/* util: mm -> px preciso */
function mmToPx(mm) {
  const el = document.createElement('div');
  el.style.width = '1mm';
  document.body.appendChild(el);
  const pxPerMm = el.getBoundingClientRect().width;
  document.body.removeChild(el);
  return mm * pxPerMm;
}

export default function A4Preview({ markdown, containerRef }) {
  const [pages, setPages] = useState([]);
  const DOMPurify = useMemo(() => createDOMPurify(window), []);

  const html = useMemo(() => {
    const raw = marked.parse(markdown ?? '', { breaks: true, gfm: true });
    return DOMPurify.sanitize(raw);
  }, [markdown, DOMPurify]);

  useEffect(() => {
    // ---- medidas e limites ----
    const PAGE_W_MM = 210;
    const PAGE_H_MM = 297;
    const PAD_MM = 20;                 // padding do <Page/>
    const SAFE_BOTTOM_MM = 3;          // folga de segurança no rodapé
    const contentWidthPx  = mmToPx(PAGE_W_MM - PAD_MM * 2);
    const contentHeightPx = mmToPx(PAGE_H_MM - PAD_MM * 2 - SAFE_BOTTOM_MM);

    // controle de órfãos/viúvas (mínimo de linhas no topo/fundo)
    const MIN_LINES_FOOT = 2;  // se só cabem <=2 linhas no fim da página, empurra tudo
    const MIN_LINES_HEAD = 2;  // quando quebra, garante pelo menos 2 linhas no topo da nova

    // raiz oculta para medir (precisa estar no DOM)
    const measureRoot = document.createElement('div');
    Object.assign(measureRoot.style, {
      position: 'fixed',
      left: '-100000px',
      top: '0',
      width: `${contentWidthPx}px`,
      pointerEvents: 'none',
      visibility: 'hidden',
      zIndex: '-1'
    });
    document.body.appendChild(measureRoot);

    // sandbox com o HTML renderizado
    const scratch = document.createElement('div');
    scratch.style.width = `${contentWidthPx}px`;
    scratch.innerHTML = html;

    const makePageContent = () => {
      const content = document.createElement('div');
      content.style.width = `${contentWidthPx}px`;
      content.style.height = `${contentHeightPx}px`;
      content.style.overflow = 'auto';
      measureRoot.appendChild(content);
      return content;
    };

    const builtHTML = [];
    let content = makePageContent();

    const fits = () => content.scrollHeight <= content.clientHeight;
    const spaceLeft = () => content.clientHeight - content.scrollHeight; // >= 0 quando cabe

    const finalizeAndStartNewPage = () => {
      builtHTML.push(content.innerHTML);
      measureRoot.removeChild(content);
      content = makePageContent();
    };

    // util: estima altura de uma linha do parágrafo atual
    const lineHeightPx = (el) => {
      const lh = parseFloat(getComputedStyle(el).lineHeight);
      if (!Number.isNaN(lh)) return lh;
      const fs = parseFloat(getComputedStyle(el).fontSize) || 16;
      return fs * 1.6; // fallback
    };

    // Busca binária para achar maior prefixo que cabe — por PALAVRAS
    const binarySplitByWords = (text, testerEl) => {
      const words = text.split(' ');
      let lo = 0, hi = words.length, best = 0;

      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        testerEl.textContent = words.slice(0, mid).join(' ');
        content.appendChild(testerEl);
        const ok = fits();
        content.removeChild(testerEl);
        if (ok) { best = mid; lo = mid + 1; } else { hi = mid - 1; }
      }

      return {
        left: words.slice(0, best).join(' '),
        right: words.slice(best).join(' ').replace(/^ /, '')
      };
    };

    // Busca binária para <pre> — por LINHAS
    const binarySplitByLines = (text, testerEl) => {
      const lines = text.split('\n');
      let lo = 0, hi = lines.length, best = 0;

      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        testerEl.textContent = lines.slice(0, mid).join('\n');
        content.appendChild(testerEl);
        const ok = fits();
        content.removeChild(testerEl);
        if (ok) { best = mid; lo = mid + 1; } else { hi = mid - 1; }
      }

      return {
        left: lines.slice(0, best).join('\n'),
        right: lines.slice(best).join('\n').replace(/^\n/, '')
      };
    };

    // parágrafo com controle de órfãos/viúvas + split fino
    const handleParagraph = (p) => {
      // se couber inteiro, ótimo
      content.appendChild(p);
      if (fits()) return;

      // compute linhas que cabem no espaço restante
      const lh = lineHeightPx(p);
      const linesPossible = Math.max(0, Math.floor((spaceLeft() + p.scrollHeight) / lh) - Math.floor((p.scrollHeight - lh) / lh));

      content.removeChild(p);

      // se cabem poucas linhas no rodapé, empurra parágrafo inteiro
      if (linesPossible <= MIN_LINES_FOOT) {
        finalizeAndStartNewPage();
        content.appendChild(p);
        if (fits()) return;
        content.removeChild(p);
      }

      // split por palavras via binária
      const tester = document.createElement('p');
      tester.style.margin = getComputedStyle(p).margin;
      tester.style.font = getComputedStyle(p).font;

      const { left, right } = binarySplitByWords(p.textContent || '', tester);

      // garante que o topo da nova página tenha ao menos N linhas
      const linesRight = Math.ceil((right.length / Math.max(1, (p.textContent || '').length)) * Math.ceil((p.scrollHeight || lh) / lh));
      if (left.trim().length === 0 || linesRight < MIN_LINES_HEAD) {
        finalizeAndStartNewPage();
        content.appendChild(p);
        if (fits()) return;
        content.removeChild(p);
        // se ainda não coube, forçamos split novamente (pode acontecer em parágrafos gigantes)
        const secondTester = document.createElement('p');
        secondTester.style.margin = getComputedStyle(p).margin;
        secondTester.style.font = getComputedStyle(p).font;
        const second = binarySplitByWords(p.textContent || '', secondTester);
        const leftP = document.createElement('p');
        const rightP = document.createElement('p');
        leftP.textContent = second.left;
        rightP.textContent = second.right;
        content.appendChild(leftP);
        finalizeAndStartNewPage();
        content.appendChild(rightP);
        return;
      }

      // aplica o split calculado
      const leftP = document.createElement('p');
      const rightP = document.createElement('p');
      leftP.textContent = left;
      rightP.textContent = right;

      content.appendChild(leftP);
      finalizeAndStartNewPage();
      content.appendChild(rightP);
    };

    // <pre> com split por LINHAS e folga
    const handlePre = (pre) => {
      content.appendChild(pre);
      if (fits()) return;
      content.removeChild(pre);

      const tester = document.createElement('pre');
      tester.style.margin = getComputedStyle(pre).margin;
      tester.style.font = getComputedStyle(pre).font;
      tester.style.whiteSpace = 'pre-wrap';
      tester.style.wordBreak = 'break-word';

      const { left, right } = binarySplitByLines(pre.textContent || '', tester);

      // se nada coube, empurra para nova página
      if (!left.trim()) {
        finalizeAndStartNewPage();
        content.appendChild(pre);
        if (!fits()) {
          // último recurso: limita altura do pre (evita loop)
          pre.style.maxHeight = `${contentHeightPx - mmToPx(1)}px`;
          pre.style.overflow = 'auto';
        }
        return;
      }

      const leftPre = document.createElement('pre');
      leftPre.textContent = left;
      content.appendChild(leftPre);
      finalizeAndStartNewPage();

      const rightPre = document.createElement('pre');
      rightPre.textContent = right;
      content.appendChild(rightPre);
    };

    // listas: adiciona item a item; se estourar, pula página
    const handleList = (list) => {
      const isUL = list.tagName === 'UL';
      let acc = list.cloneNode(false);

      for (const li of Array.from(list.children)) {
        const liClone = li.cloneNode(true);
        acc.appendChild(liClone);
        content.appendChild(acc);
        if (!fits()) {
          acc.removeChild(liClone);
          content.removeChild(acc);
          if (acc.childNodes.length) content.appendChild(acc);
          finalizeAndStartNewPage();
          acc = document.createElement(isUL ? 'ul' : 'ol');
          acc.appendChild(liClone);
        } else {
          content.removeChild(acc);
        }
      }
      if (!content.contains(acc)) content.appendChild(acc);
    };

    // fluxo principal
    for (const node of Array.from(scratch.childNodes)) {
      content.appendChild(node);
      if (fits()) continue;

      content.removeChild(node);

      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName;
        if (tag === 'P') { handleParagraph(node.cloneNode(true)); continue; }
        if (tag === 'PRE') { handlePre(node.cloneNode(true)); continue; }
        if (tag === 'UL' || tag === 'OL') { handleList(node); continue; }
      }

      // fallback: bloco inteiro numa nova página
      finalizeAndStartNewPage();
      content.appendChild(node);
      if (!fits()) {
        // se um bloco isolado ainda passar, reduz um pouquinho o alvo pra esta página
        content.style.height = `${contentHeightPx - mmToPx(2)}px`;
      }
    }

    // última
    builtHTML.push(content.innerHTML);
    document.body.removeChild(measureRoot);

    setPages(
      builtHTML.map((inner, i) => (
        <Page key={`pg-${i}`}>
          <div
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            dangerouslySetInnerHTML={{ __html: inner }}
          />
        </Page>
      ))
    );
  }, [html]);

  return <Pages ref={containerRef}>{pages}</Pages>;
}
