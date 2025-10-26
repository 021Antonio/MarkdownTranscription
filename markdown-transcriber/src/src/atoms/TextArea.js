import styled from 'styled-components';


const Base = styled.textarea`
width: 100%;
height: 100%;
padding: 16px 18px 24px 18px;
background: var(--surface);
color: var(--text);
border: none;
outline: none;
resize: none;
font-size: 15px;
line-height: 1.65;
border-top: 1px solid var(--border);
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
`;


export default function TextArea(props){
return <Base spellCheck={false} {...props} />;
}