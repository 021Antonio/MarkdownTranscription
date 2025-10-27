"use client";
import styled from "styled-components";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import Separator from "@/components/atoms/Separator";


const Bar = styled.div`
position: sticky;
top: 0;
z-index: 10;
display: flex;
align-items: center;
gap: 8px;
padding: 8px;
background: #fff;
border-bottom: 1px solid #eee;
box-shadow: 0 1px 4px rgba(0,0,0,0.04);
`;


export default function Toolbar({ onBold, onItalic, onUnderline, onPrint }) {
return (
<Bar role="toolbar" aria-label="Editor toolbar" className="no-print">
<Button onClick={onBold} aria-label="Negrito (Ctrl/Cmd+B)"><Icon name="bold" />B</Button>
<Button onClick={onItalic} aria-label="Itálico (Ctrl/Cmd+I)"><Icon name="italic" />I</Button>
<Button onClick={onUnderline} aria-label="Sublinhado (Ctrl/Cmd+U)"><Icon name="underline" />U</Button>
<Separator />
<Button onClick={onPrint} aria-label="Imprimir/Exportar"><Icon name="print" />Imprimir/Exportar</Button>
</Bar>
);
}