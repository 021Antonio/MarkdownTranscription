import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const TextArea = styled.textarea`
  width: 210mm;
  height: 297mm;
  padding: 20mm;
  font-size: 16px;
  line-height: 1.6;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

export default function PaginationContainer() {
  const [text, setText] = useState("");

  return (
    <Container>
      <TextArea
        placeholder="Digite seu texto aqui..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Container>
  );
}