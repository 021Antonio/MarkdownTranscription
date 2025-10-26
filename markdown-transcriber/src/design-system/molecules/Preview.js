'use client';

import { useMemo } from 'react';
import styled from 'styled-components';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
  background: ${({theme}) => theme.colors.card};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.radii.xl};
  padding: 20px;

  h1,h2,h3 { margin-top: 1.2em; }
  code, pre {
    background: #0a0f22;
    padding: 2px 6px;
    border-radius: 6px;
  }
  pre { padding: 12px; overflow: auto; }
  hr { border-color: ${({theme}) => theme.colors.border}; }
`;

export default function Preview({ markdown }) {
  const html = useMemo(() => {
    const raw = marked.parse(markdown ?? '', { breaks: true, gfm: true });
    return DOMPurify.sanitize(raw);
  }, [markdown]);

  return <Wrapper dangerouslySetInnerHTML={{ __html: html }} />;
}
