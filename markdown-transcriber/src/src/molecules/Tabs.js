import styled from 'styled-components';
import TabButton from '@/src/atoms/TabButton';


const Bar = styled.div`
display: flex;
gap: 8px;
padding: 12px 14px;
border-bottom: 1px solid var(--border);
background: var(--surface);
position: sticky;
top: 0;
z-index: 2;
`;


export default function Tabs({ active, onChange }){
return (
<Bar>
<TabButton active={active === 'write'} onClick={() => onChange('write')}>Write</TabButton>
<TabButton active={active === 'preview'} onClick={() => onChange('preview')}>Preview</TabButton>
</Bar>
);
}