import { useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabs from '@/src/molecules/Tabs';
import TextArea from '@/src/atoms/TextArea';
import PreviewPane from '@/src/molecules/PreviewPane';
import { mdToSafeHtml } from '@/utils/markdown';

const Pane = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 50vh;
`;

const EmptyHint = `# Welcome!
Write Markdown on the left and switch to **Preview**.

- Supports _italics_, **bold**, \`code\`, lists, links, and more.
- Your draft is saved locally.

> Tip: Use \`---\` for a divider.
`;

export default function EditorPreview() {
  const [active, setActive] = useState('write');

  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return EmptyHint;
    const cached = window.localStorage.getItem('md-draft-v1');
    return cached ?? EmptyHint;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem('md-draft-v1', value);
  }, [value]);

  const html = useMemo(() => mdToSafeHtml(value), [value]);

  return (
    <Pane>
      <Tabs active={active} onChange={setActive} />
      {active === 'write' ? (
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write Markdown here..."
        />
      ) : (
        <PreviewPane html={html} />
      )}
    </Pane>
  );
}
