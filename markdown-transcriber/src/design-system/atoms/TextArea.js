'use client';

import styled from 'styled-components';

const Area = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  background: ${({theme}) => theme.colors.card};
  color: ${({theme}) => theme.colors.text};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: ${({theme}) => theme.radii.xl};
  padding: 16px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  line-height: 1.5;
`;

export default Area;
