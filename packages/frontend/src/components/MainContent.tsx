import React from 'react';
import { useUI } from '../context/UIContext';
import { useTheme } from '@em_app/shared';

type Props = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

export const MainContent: React.FC<Props> = ( { children, style } ) => {
  const { isNavbarOpen } = useUI();
  const { theme } = useTheme();

  const styles:{ [key: string ]: React.CSSProperties } = {
    div: {
      marginLeft: isNavbarOpen ? 240 : 0, // adjust for navbar width
      transition: 'margin-left 0.3s ease',
      padding: '1rem',
      height: '100vh',
      backgroundColor: theme.background,
    },
  };

  return (
    < div style={{ ...styles.div, ...style}}>
        {children}
    </div>
  );
};
