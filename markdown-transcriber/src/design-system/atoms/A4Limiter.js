'use client';

import styled from 'styled-components';

const A4Limiter = styled.div`
  width: 210mm;
  height: 297mm;            /* altura fixa! */
  padding: 20mm;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans, "Helvetica Neue";
  font-size: 16px;
  line-height: 1.6;

  h1,h2,h3 { margin: 16px 0 8px; font-weight: 700; }
  p, li { margin: 0 0 10px; }
  pre { margin: 10px 0; white-space: pre-wrap; word-break: break-word; }
  img { max-width: 100%; height: auto; display: block; margin: 8px 0; }
`;

export default A4Limiter;
