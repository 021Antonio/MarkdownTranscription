'use client';

import TextArea from '@atoms/TextArea';
import styled from 'styled-components';

const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default function Editor({ value, onChange }) {
  return (
    <Box>
      <TextArea
        placeholder="# Escreva seu Markdown aqui…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}
