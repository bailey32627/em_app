import React from 'react';
import { useTheme } from '@em_app/shared';

interface ThemedScrollableHorizonalProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  height: number;
};


export const ThemedScrollableHorizonal: React.FC< ThemedScrollableHorizonalProps > = ( { height, children, style } ) => {
  const { theme } = useTheme();

  const styles: { [key: string]: React.CSSProperties } = {
    div: {
      borderRadius: "10px",
      border: 'none',
      height: height,
      overflowX: 'scroll',
      backgroundColor: theme.surface_a10,
      color: theme.text_color,
      padding: '1rem',
      margin: '1rem',
    },
  };

  return (
    <div style={{ ...styles.div, ...style } }>
      {children}
    </div>
  )
}
