"use client";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
:root {
--page-width-mm: 210mm;
--page-height-mm: 297mm;
--page-padding-mm: 20mm;
--page-bg: #fff;
--page-shadow: 0 2px 8px rgba(0,0,0,0.08);
--paper-offwhite: #f8f8f6;
}


html, body { height: 100%; }
html { background: #f2f3f5; }
body {
margin: 0;
color: #222;
font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
line-height: 1.6;
}


* { box-sizing: border-box; }


@media print {
html, body { background: #fff; }
.page { box-shadow: none !important; margin: 0 !important; page-break-after: always; }
.page:last-of-type { page-break-after: auto; }
.no-print { display: none !important; }
}
`;


export default GlobalStyle;