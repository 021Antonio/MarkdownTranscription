import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root{
    --bg: #0b0d10;
    --surface: #13161b;
    --surface-2: #181c22;
    --text: #e9eef5;
    --muted: #98a2b3;
    --primary: #7c5cff;
    --primary-600: #6b4bff;
    --border: #242a33;
  }

  *{ box-sizing: border-box; }
  html, body, #__next{ height: 100%; }
  body{
    margin: 0;
    background: var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  }
`;

export const Shell = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
`;

export const Header = styled.header`
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Brand = styled.div`
  font-weight: 700;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  gap: 10px;

  & span.logo{
    display: inline-grid;
    place-items: center;
    width: 28px; height: 28px;
    border-radius: 8px;
    background: var(--primary);
    color: white;
    font-size: 16px;
  }
`;

export const Main = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
  background: var(--surface);
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 980px){
    grid-template-columns: 1fr 1fr;
  }
  gap: 0;
`;

export const Section = styled.section`
  border-right: 1px solid var(--border);
  &:last-child{ border-right: none; }
`;
