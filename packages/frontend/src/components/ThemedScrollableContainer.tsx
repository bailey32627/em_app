import React from 'react';
import { useTheme } from '@em_app/shared';

interface ThemedScrollableHorizonalProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  width: number;
};


export const ThemedScrollableHorizonal: React.FC< ThemedScrollableHorizonalProps > = ( { width, children, style } ) => {
  const { theme } = useTheme();

  const styles: { [key: string]: React.CSSProperties } = {
    div: {
      borderRadius: "10px",
      border: `1px solid ${theme.surface_a50}`,
      width: width,
      overflowX: 'scroll',
      backgroundColor: theme.surface_a10,
      color: theme.text_color,

    },
  };

  return (
    <div style={{ ...styles.div, ...style } }>
      {children}
    </div>
  )
}

interface ThemedScrollableVerticalProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  height: number;
}

export const ThemedScrollableVertical: React.FC< ThemedScrollableVerticalProps > = ({ height, children, style } ) => {
  const { theme } = useTheme();

  const styles: { [key: string]: React.CSSProperties } = {
    div: {
      borderRadius: "10px",
      border: `1px solid ${theme.surface_a50}`,
      height: height,
      overflowY: 'scroll',
      backgroundColor: theme.surface_a10,
      color: theme.text_color,
    },
  };

  return (
    <div style={{ ...styles.div, ...style } }>
      {children}
    </div>
  )
}
