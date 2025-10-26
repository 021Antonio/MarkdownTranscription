'use client';

/**
 * Exporta o container (que envolve todas as <Page/>) para PDF A4.
 * Usa import dinâmico para carregar html2pdf **apenas no browser**.
 * @param {HTMLElement} node
 * @param {string} filename
 */
export async function exportContainerToPdf(node, filename = 'documento.pdf') {
  if (!node) return;

  // Garante que estamos no client
  if (typeof window === 'undefined') {
    console.warn('exportContainerToPdf foi chamado no servidor. Abortando.');
    return;
  }

  // Import dinâmico: evita "self is not defined" no SSR
  const html2pdf = (await import('html2pdf.js')).default;

  const opt = {
    margin: [0, 0, 0, 0],
    filename,
    image: { type: 'jpeg', quality: 0.96 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['css', 'legacy', 'avoid-all'] }
  };

  // Força largura de A4 para consistência do render
  const prevWidth = node.style.width;
  node.style.width = '210mm';

  try {
    await html2pdf().from(node).set(opt).save();
  } finally {
    node.style.width = prevWidth || '';
  }
}
