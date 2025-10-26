import styled from 'styled-components';


const Button = styled.button`
appearance: none;
background: transparent;
border: 1px solid var(--border);
color: var(--text);
padding: 8px 12px;
border-radius: 10px;
cursor: pointer;
font-weight: 600;
transition: transform .05s ease, background .15s ease, border-color .15s ease;


${({ active }) => active && `
background: var(--surface-2);
border-color: var(--primary);
`}


&:hover{ border-color: var(--primary-600); }
&:active{ transform: translateY(1px); }
`;


export default function TabButton({ children, active, ...rest }){
return <Button active={active ? 1 : 0} {...rest}>{children}</Button>;
}