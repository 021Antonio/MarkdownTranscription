"use client";
import styled from "styled-components";


const Button = styled.button`
display: inline-flex;
align-items: center;
gap: 8px;
padding: 8px 12px;
border-radius: 8px;
border: 1px solid #dcdcdc;
background: #fff;
cursor: pointer;
font-size: 14px;
line-height: 1;
transition: background .15s ease;


&:hover { background: #f6f6f6; }
&:active { background: #efefef; }
`;


export default Button;