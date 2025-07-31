import React, { ReactNode, useState } from 'react';
// routing
import { Link } from 'react-router-dom';
// theme
import { useTheme } from '@em_app/shared';

interface IconButtonProps {
  path: string;   // where the link navigates to
  icon?: ReactNode;   // any react element like <FaHome />
  label: string;     // label for the link
  onClick?: ()=> void;  // optional onClick event
  color?: string;       // color of the text and icon
}

export const ThemedLink: React.FC< IconButtonProps > = ({ path, icon, label, onClick, color }) => {
  const { theme } = useTheme();
  const [ hovered, setHovered ] = useState( false );

  const styles: { [key: string]: React.CSSProperties } = {
    link: {
      textDecoration: 'none',
      color: color ? color : theme.text_color,
      fontSize: '18px',
      width: '95%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      borderRadius: '4px',
      justifyContent: "left",
      backgroundColor: hovered ? theme.surface_a50: theme.surface_a10,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    icon: {
      fontSize: '1.5em',
      color: color ? color : theme.primary_a10,
      marginRight: '10px',
    },
  };

  return (
    <Link
      to={path}
      style= {styles.link }
      onMouseEnter= {() => setHovered( true ) }
      onMouseLeave={ () => setHovered( false ) }
      onClick = {onClick}
    >
    { icon && ( <span style={styles.icon}>{icon}</span> )}{label}
    </Link>
  )
};
