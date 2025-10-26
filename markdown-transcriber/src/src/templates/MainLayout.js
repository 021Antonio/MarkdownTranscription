import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import PreviewPane from '@/src/molecules/PreviewPane';
import { mdToSafeHtml } from '@/utils/markdown';
import EditorPreview from '@/src/organisms/EditorPreview';
import { Content, Header, Main, Section } from '@/styles/globals';

const Title = styled.h1`
  font-size: 16px;
  margin: 0;
  color: var(--muted);
  font-weight: 600;
`;

export default function MainLayout() {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem('md-draft-v1') || '';
  });

  useEffect(() => {
    const onStorage = () => {
      const updated = window.localStorage.getItem('md-draft-v1') || '';
      setValue(updated);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const html = useMemo(() => mdToSafeHtml(value), [value]);

  return (
    <Main>
      <Header>
        <Title>Markdown → Preview</Title>
      </Header>

      <Content>
        <Section>
          <EditorPreview />
        </Section>

        <Section style={{ display: 'none' }} className="desktop-preview">
          <PreviewPane html={html} />
        </Section>
      </Content>
    </Main>
  );
}
