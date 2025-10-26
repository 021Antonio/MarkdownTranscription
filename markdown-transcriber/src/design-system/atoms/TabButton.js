'use client';

import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 14px;
  border: 1px solid ${({theme}) => theme.colors.border};
  background: ${({$active, theme}) => ($active ? theme.colors.primary : theme.colors.card)};
  color: ${({$active}) => ($active ? '#0b1020' : 'white')};
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: transform .03s ease, background .2s ease;
  &:active { transform: translateY(1px); }
`;

export default function TabButton({ active, children, ...props }) {
  return <Button $active={active} {...props}>{children}</Button>;
}
