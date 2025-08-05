import React, { ReactNode, useState } from 'react';
// routing
import { Link } from 'react-router-dom';
// theme
import { useTheme } from '@em_app/shared';

interface IconButtonProps {
  path: string;   // where the link navigates to
  onClick?: ()=> void;  // optional onClick event
  style?: React.CSSProperties;
  children: ReactNode;
}

export const ThemedLink: React.FC< IconButtonProps > = ({ path, onClick, children, style }) => {
  const { theme } = useTheme();
  const [ hovered, setHovered ] = useState( false );

  const styles: { [key: string]: React.CSSProperties } = {
    link: {
      textDecoration: 'none',
      color: theme.text_color,
      width: '95%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      borderRadius: '4px',
      justifyContent: "left",
      backgroundColor: hovered ? theme.surface_a50: theme.surface_a10,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },

  };

  return (
    <Link
      to={path}
      style= {{...styles.link, ...style }}
      onMouseEnter= {() => setHovered( true ) }
      onMouseLeave={ () => setHovered( false ) }
      onClick = {onClick}
    >
    {children}
    </Link>
  )
};
