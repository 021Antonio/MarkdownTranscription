"use client";
import styled from "styled-components";


const Wrapper = styled.div`
position: absolute;
bottom: 10mm;
left: 0;
right: 0;
text-align: center;
color: #8c8c8c;
font-size: 12px;
`;


export default function PageNumber({ index, total }) {
return <Wrapper aria-label={`Página ${index+1} de ${total}`}>{index + 1} / {total}</Wrapper>;
}