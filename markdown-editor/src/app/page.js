"use client";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import EditorLayout from "../components/templates/EditorLayout";


// Documento inicial com um bloco para começar
const initialBlocks = [
{ id: "b1", type: "paragraph", text: "" }
];


const Container = styled.div`
max-width: 1100px;
margin: 0 auto;
padding: 16px 16px 64px;
`;


export default function Page() {
const [blocks, setBlocks] = useState(initialBlocks);


const onChangeBlocks = useCallback((nextBlocks) => {
setBlocks(nextBlocks);
}, []);


const toolbarActions = useMemo(() => ({
print: () => window.print()
}), []);


return (
<Container>
<EditorLayout blocks={blocks} onChangeBlocks={onChangeBlocks} toolbarActions={toolbarActions} />
</Container>
);
}