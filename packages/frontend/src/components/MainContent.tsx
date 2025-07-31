import React from 'react';
import { useUI } from '../context/UIContext';
import { useTheme } from '@em_app/shared';

type Props = {
  children?: React.ReactNode;
};

export const MainContent: React.FC<Props> = ( { children } ) => {
  const { isNavbarOpen } = useUI();
  const { theme } = useTheme();

  return (
    <div
      style={{
        marginLeft: isNavbarOpen ? 240 : 0, // adjust for navbar width
        transition: 'margin-left 0.3s ease',
        padding: '1rem',
        height: '100vh',
        backgroundColor: theme.background,
      }}>
        {children}
    </div>
  );
};
