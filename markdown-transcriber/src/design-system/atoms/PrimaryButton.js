'use client';

import styled from 'styled-components';

const PrimaryButton = styled.button`
  padding: 10px 14px;
  border: 1px solid ${({theme}) => theme.colors.border};
  background: ${({theme}) => theme.colors.primary};
  color: #0b1020;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  transition: transform .03s ease, opacity .2s ease;
  &:active { transform: translateY(1px); }
  &:disabled { opacity: .6; cursor: not-allowed; }
`;

export default PrimaryButton;
