import React, { useState } from 'react';
import { useTheme } from '@em_app/shared';

interface ThemedCardProps {
  width?: number;
  height?: number;
  zoom?: boolean;  // expand the card slightly to look like it was focused
  children?: React.ReactNode;
};


export const ThemedCard: React.FC< ThemedCardProps > = ({ width=400, height=250, zoom=false, children }) => {
  const { theme } = useTheme();
  const [ hovered, setHovered ] = useState( false );

  const styles: { [key: string]: React.CSSProperties } = {
    div: {
      display: 'flex',
      width: hovered ? ( zoom ? width*1.15 : width ) : width,
      height: hovered ? ( zoom ? height*1.15 : height ) : height,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5%",
      border: 'none',
      backgroundColor: theme.surface_a10,
      color: theme.text_color,
      transition: "all 0.2s ease",
      fontSize: hovered ? ( zoom ? '1.15rem' : '1rem' ): '1rem',
      padding: '1rem',
      margin: hovered ? ( zoom ? '0' : '1rem' ) : '1rem',
    },
  };

  return (
    <
    div style={styles.div}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
};
