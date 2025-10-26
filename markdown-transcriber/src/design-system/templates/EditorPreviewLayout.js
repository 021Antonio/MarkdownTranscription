'use client';

import { useState, useRef } from 'react';
import styled from 'styled-components';
import Editor from '@molecules/Editor';
import A4Preview from '@molecules/A4Preview';
import PrimaryButton from '@atoms/PrimaryButton';
import TabView from '@organisms/TabView';

const Container = styled.main`
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 20px 40px;
  display: grid;
  gap: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  letter-spacing: 0.2px;
`;

const Card = styled.section`
  background: transparent;
  border-radius: ${({ theme }) => theme.radii.xl};
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 980px) { grid-template-columns: 1fr; }
`;

export default function EditorPreviewLayout() {
  const [markdown, setMarkdown] = useState(`# Welcome!\n\n- Escreva Markdown na **aba Editor**\n- Veja o resultado na **aba Preview**\n\n\`\`\`js\nconsole.log("hello world")\n\`\`\``);

  const previewRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const handleExportPdf = async () => {
    try {
      setDownloading(true);
      const { exportContainerToPdf } = await import('@lib/exportPdf');
      await exportContainerToPdf(previewRef.current, 'meu-documento.pdf');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Markdown ↔ Texto</Title>
        <PrimaryButton onClick={handleExportPdf} disabled={downloading}>
          {downloading ? 'Gerando PDF…' : 'Exportar PDF'}
        </PrimaryButton>
      </Header>

      <Card>
        <TabView
          tabs={[
            {
              key: 'split',
              label: 'Editor e Preview',
              content: (
                <TwoCol>
                  <Editor value={markdown} onChange={setMarkdown} />
                  <A4Preview markdown={markdown} containerRef={previewRef} />
                </TwoCol>
              )
            },
            {
              key: 'editor',
              label: 'Só Editor',
              content: <Editor value={markdown} onChange={setMarkdown} />
            },
            {
              key: 'preview',
              label: 'Só Preview',
              content: <A4Preview markdown={markdown} containerRef={previewRef} />
            }
          ]}
        />
      </Card>
    </Container>
  );
}
