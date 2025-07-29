import React from 'react';
import { useUI } from '../context/UIContext';

type Props = {
  children: React.ReactNode;
};

export const MainContent: React.FC<Props> = ( { children } ) => {
  const { isNavbarOpen } = useUI();

  return (
    <div
      style={{
        marginLeft: isNavbarOpen ? 240 : 0, // adjust for navbar width
        transition: 'margin-left 0.3s ease',
        padding: '1rem',
      }}>
        {children}
    </div>
  );
};
