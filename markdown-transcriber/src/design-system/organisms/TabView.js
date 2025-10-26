'use client';

import { useState } from 'react';
import styled from 'styled-components';
import TabButton from '@atoms/TabButton';

const Bar = styled.div`
  display: flex;
  gap: 8px;
  background: transparent;
`;

const Panel = styled.div`
  height: calc(100dvh - 170px);
`;

export default function TabView({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.key ?? 'editor');

  return (
    <>
      <Bar>
        {tabs.map(t => (
          <TabButton
            key={t.key}
            active={active === t.key}
            onClick={() => setActive(t.key)}
            aria-pressed={active === t.key}
          >
            {t.label}
          </TabButton>
        ))}
      </Bar>
      <Panel>
        {tabs.find(t => t.key === active)?.content}
      </Panel>
    </>
  );
}
