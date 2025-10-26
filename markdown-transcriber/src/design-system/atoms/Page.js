'use client';
import styled from 'styled-components';

const Page = styled.div.attrs({ className: 'pagedoc-page' })`
  /* Folha A4 visual */
  width: 210mm;
  height: 297mm;                 /* fixa (para preview paginado) */
  background: #fff;
  color: #111;
  margin: 0 auto;
  padding: 20mm;                  /* margens internas “Google Docs” */
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,.25);
  border: 1px solid rgba(0,0,0,.06);

  h1,h2,h3 { margin: 16px 0 8px; }
  p, li { line-height: 1.6; margin: 0 0 10px; }
  pre { background:#f4f6fb; padding:12px; border-radius:6px; overflow:auto; margin:10px 0; white-space:pre-wrap; word-break:break-word; }
  img { max-width:100%; height:auto; display:block; margin:8px 0; }
  table { width:100%; border-collapse:collapse; margin:10px 0; }
  th, td { border:1px solid #e5e7ee; padding:6px 8px; }

  /* impressão: cada página vira uma folha */
  @media print {
    box-shadow: none;
    border: none;
    page-break-after: always;
  }
`;
export default Page;
