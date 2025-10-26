import styled from 'styled-components';


const Wrap = styled.div`
padding: 18px;
border-top: 1px solid var(--border);
height: 100%;
overflow: auto;


/* basic markdown styles */
h1,h2,h3,h4,h5{ margin: 18px 0 10px; }
p, ul, ol { color: var(--text); }
pre, code {
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
background: var(--surface-2);
border: 1px solid var(--border);
border-radius: 10px;
padding: 2px 6px;
}
pre{ padding: 12px; overflow: auto; }
a{ color: var(--primary); text-decoration: none; }
`;


export default function PreviewPane({ html }){
return <Wrap dangerouslySetInnerHTML={{ __html: html }} />;
}