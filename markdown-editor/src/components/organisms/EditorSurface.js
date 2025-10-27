"use client";
import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 12px auto 16px;
  max-width: 920px;
  background: var(--paper-offwhite);
  border: 1px dashed #e5e5e5;
  border-radius: 8px;
  padding: 12px;
`;

const CE = styled.div`
  min-height: 120px;
  outline: none;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 16px;
`;

/**
 * Normaliza o DOM do contenteditable em um array de blocks = [{id,type,text}]
 * - Um <div> ou <p> vira um bloco "paragraph"; <h1>.. <h3> viram "heading" com prefixo #
 */
function domToBlocks(root) {
  const blocks = [];
  const ensureId = () => Math.random().toString(36).slice(2);

  const children = Array.from(root.childNodes);
  if (children.length === 0) {
    return [{ id: ensureId(), type: "paragraph", text: "" }];
  }

  for (const node of children) {
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.nodeValue || "";
      if (txt.trim() !== "") {
        blocks.push({ id: ensureId(), type: "paragraph", text: txt });
      }
      continue;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = node.tagName.toLowerCase();
      const text = node.innerText.replace(/\u200B/g, "");
      if (tag === "h1" || tag === "h2" || tag === "h3") {
        blocks.push({ id: ensureId(), type: "heading", text });
      } else {
        blocks.push({ id: ensureId(), type: "paragraph", text });
      }
    }
  }
  return blocks;
}

/**
 * Render auxiliares simples para o contenteditable: converte blocks -> HTML leve
 */
function blocksToHtml(blocks) {
  if (!blocks || blocks.length === 0) return "";
  return blocks.map(b => {
    if (b.type === "heading") return `<h2>${escapeHtml(b.text)}</h2>`;
    return `<p>${escapeHtml(b.text)}</p>`;
  }).join("");
}

function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default function EditorSurface({ value, onChange }) {
  const ref = useRef(null);
  const skipNextSyncRef = useRef(false); // evita resetar caret quando a mudança é local

  // 🔁 Sincroniza conteúdo quando `value` muda EXTERNAMENTE
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (skipNextSyncRef.current) {
      // mudança veio do próprio editor; não sobrescreva o caret
      skipNextSyncRef.current = false;
      return;
    }

    if (Array.isArray(value)) {
      const html = blocksToHtml(value);
      if (el.innerHTML !== html) {
        el.innerHTML = html;
      }
    }
  }, [value]); // ✅ inclui 'value' nas deps

  // ✍️ Emite blocks durante digitação (mudanças LOCAIS)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = null;
    const handler = () => {
      cancelAnimationFrame(raf);
      // marca que a próxima sincronização de `value` deve ser ignorada
      skipNextSyncRef.current = true;
      raf = requestAnimationFrame(() => {
        onChange(domToBlocks(el));
      });
    };

    el.addEventListener("input", handler);
    return () => {
      el.removeEventListener("input", handler);
      cancelAnimationFrame(raf);
    };
  }, [onChange]);

  // ⌨️ Atalhos Ctrl/Cmd+B/I/U (deixa como já estava)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKeyDown = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      if (k === "b" || k === "i" || k === "u") e.preventDefault();
      if (k === "b") document.execCommand("bold");
      if (k === "i") document.execCommand("italic");
      if (k === "u") document.execCommand("underline");
    };
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Wrapper aria-label="Editor WYSIWYG">
      <CE ref={ref} contentEditable suppressContentEditableWarning spellCheck={true} />
    </Wrapper>
  );
}
