"use client";
import styled from "styled-components";
import PageNumber from "@/components/molecules/PageNumber";


const PageShell = styled.div`
width: var(--page-width-mm);
height: var(--page-height-mm);
padding: var(--page-padding-mm);
margin: 0 auto 16px;
background: var(--page-bg);
box-shadow: var(--page-shadow);
border: 1px solid #eaeaea;
border-radius: 4px;
position: relative;
overflow: hidden; /* nada estoura visualmente */
&.page { /* class for @media print hooks */ }
`;


const Content = styled.div`
height: calc(var(--page-height-mm) - calc(var(--page-padding-mm) * 2));
overflow: hidden; /* a lógica de quebra impede overflow */
`;


export default function Page({ children, index, total }) {
return (
<PageShell className="page" role="region" aria-label={`Página ${index+1}`}>
<Content className="content">
{children}
</Content>
<PageNumber index={index} total={total} />
</PageShell>
);
}