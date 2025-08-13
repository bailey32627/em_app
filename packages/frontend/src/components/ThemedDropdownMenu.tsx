import React, { ReactElement, ReactNode, useState, useRef, useEffect } from 'react';
import { useTheme } from '@em_app/shared';
import { AiFillCaretDown } from 'react-icons/ai'

interface ThemedDropdownProps {
  isOpen: boolean;
  label?: string;
  icon?: ReactElement;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const ThemedDropdownMenu: React.FC<ThemedDropdownProps> = ({ label, icon, children, style }) => {
  const [ isOpen, setIsOpen ] = useState( false );
  const {theme} = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen( !isOpen );
  };

  // close dropdown if clicked outside
  useEffect( () => {
    const handleClickOutside = ( event: MouseEvent ) => {
      if( dropdownRef.current && dropdownRef.current.contains( event.target as Node ) ) {
        setIsOpen( false );
      }
    };
    document.addEventListener( 'mousedown', handleClickOutside );
    return () => document.removeEventListener( 'mousedown', handleClickOutside );
  }, [] );


  const styles:{ [key: string]: React.CSSProperties } = {
    container: {
      backgroundColor: theme.surface_a10,
      display: 'inline-block',
      position: 'relative',
      borderRadius: '8px',
      width: "100%",
    },
    trigger: {
      backgroundColor: theme.surface_a10,
      color: theme.text_color,
      border: 'none',
      cursor: 'pointer',
      borderRadius: "8px",
      width: '100%',
    },
    content: {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      minWidth: '160px',
      backgroundColor: theme.surface_a40,
      boxShadow: `0px 8px 16px 0px ${theme.surface_a50}`,
      zIndex: 1000, // overlay content
      borderRadius: '8px',
      padding: '8px',
    },
    icon: {
      color: theme.primary_a0,
      fontSize: '1.25rem',
    }
  };

  return (
    <div style={{ ...styles.container, ...style}}>
      <button onClick={ toggleDropdown } style={styles.trigger }>{label} <span style={styles.icon}>{icon}</span></button>
      { isOpen && (
        <div style={ styles.content }>
          { children }
        </div>
      )}
    </div>
  )
}
