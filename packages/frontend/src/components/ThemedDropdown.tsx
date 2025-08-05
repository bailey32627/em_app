import React, { ReactNode, useState } from 'react';
import { useTheme } from '@em_app/shared';
import { AiFillCaretDown } from 'react-icons/ai'

interface ThemedDropdownProps {
  style?: React.CSSProperties;
  children?: ReactNode;
}

export const ThemedDropdown: React.FC<ThemedDropdownProps> = ({ children, style }) => {
  const [ isOpen, setIsOpen ] = useState( false );
  const [ hovered, setHovered ] = useState( false );
  const {theme} = useTheme();

  const toggleDropdown = () => {
    setIsOpen( !isOpen );
  };

  const styles:{ [key: string]: React.CSSProperties } = {
    container: {
      backgroundColor: theme.surface_a20,
      display: 'inline-block',
      position: 'relative',
      borderRadius: '8px',
      minWidth: "200px",
      width: "100%",
    },
    trigger: {
      padding: '10px 15px',
      backgroundColor: theme.surface_a20,
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
      backgroundColor: theme.surface_a30,
      boxShadow: `0px 8px 16px 0px ${theme.surface_a50}`,
      zIndex: 1000, // overlay content
      borderRadius: '8px',
      padding: '5px 0',
    },
    content_ul: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
    },
    content_li: {
      padding: '10px 15px',
      cursor: 'pointer',
      backgroundColor: hovered ? theme.primary_a30 : theme.tonal_a10,
    },
  };

  return (
    <div style={{ ...styles.container, ...style}}>
      <button onClick={ toggleDropdown } style={styles.trigger }><AiFillCaretDown/></button>
      { isOpen && (
        <div style={ styles.content }>
          <ul style={styles.content_ul}>

            { React.Children.map( children, (child, index ) => (
              <li
                style={styles.content_li}
                key={index}
                onMouseEnter={()=>setHovered(true)}
                onMouseLeave={()=>setHovered(false)}
              >
                {child}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
