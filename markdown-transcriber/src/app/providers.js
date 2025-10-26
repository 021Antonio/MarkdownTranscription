'use client';

import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '@styles/theme';

const Global = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, Noto Sans, "Helvetica Neue";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: #000;
  }

  /* --- html2pdf support for forced page breaks --- */
  .html2pdf__page-break {
    height: 0;
    page-break-before: always;
    break-before: page;
  }
`;

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      {children}
    </ThemeProvider>
  );
}
