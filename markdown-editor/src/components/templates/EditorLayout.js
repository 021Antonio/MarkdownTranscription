"use client";
import styled from "styled-components";
import EditorSurface from "@/components/organisms/EditorSurface";
import PaginationContainer from "@/components/organisms/PaginationContainer";
import Toolbar from "../molecules/Toolbar";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #666;
  margin: 0 auto;
  max-width: 920px;
`;

export default function EditorLayout({ blocks, onChangeBlocks, toolbarActions }) {
  return (
    <Grid>
      <Toolbar
        onBold={() => document.execCommand("bold")}
        onItalic={() => document.execCommand("italic")}
        onUnderline={() => document.execCommand("underline")}
        onPrint={toolbarActions.print}
      />

      <Label>Editor (digite aqui). O conteúdo renderiza paginado abaixo:</Label>
      <EditorSurface value={blocks} onChange={onChangeBlocks} />

      <Label>Páginas A4:</Label>
      <PaginationContainer blocks={blocks} />
    </Grid>
  );
}