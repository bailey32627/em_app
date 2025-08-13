import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@em_app/shared';

type ThemedDropdownProps = {
  options: string[];
  showSelected?: boolean;
  defaultLabel?: string;
  onSelect?: (value: string) => void;
  style?: React.CSSProperties;
}


export const ThemedDropdown: React.FC<ThemedDropdownProps> = ( { options, showSelected=true, defaultLabel, onSelect, style } ) => {
  const [ isOpen, setIsOpen ] = useState( false );
  const [ selected, setSelected ] = useState<String | null>(null);
  const [ hovered, setHovered ] = useState( false );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // close dropdown when clicking outside
  useEffect( () => {
    const handleClickOutside = ( event: MouseEvent ) => {
      if( dropdownRef.current && !dropdownRef.current.contains( event.target as Node ) ) {
        setIsOpen( false );
      }
    };
    document.addEventListener( 'mousedown', handleClickOutside );
    return () => document.removeEventListener( 'mousedown', handleClickOutside );
  },[] );

  const handleOptionClick = ( option: string ) => {
    setSelected( option );
    onSelect?.(option );
    setIsOpen( false );
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      position: 'relative',
      display: 'inline-block',
      color: theme.text_color,
    },
    button: {
      padding: '8px 12px',
      border: 'none',
      backgroundColor: hovered ?  theme.surface_a40 : theme.surface_a20,
      cursor: 'pointer',
      textAlign: 'left',
      borderRadius: '8px',
      color: theme.text_color,
    },
    content: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: '4px',
      borderRadius: '8px',
      boxShadow: `0 2px 6px ${theme.surface_a50}`,
      zIndex: 1000,
      width: '100%',
      minWidth: '200px'
    },
    option: {
      padding: '8px, 12px',
      cursor: 'pointer',
    }
  }

  return (
    <div ref={dropdownRef} style={ {...styles.container, ...style}}>
      <button style={styles.button}
              onClick={ () => setIsOpen(!isOpen)}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            > { showSelected ? selected ?? defaultLabel : defaultLabel }
      </button>
      { isOpen && (
        <div style={ styles.content }>
          { options.map(( option, i ) => (
            <div
              key={i}
              onClick={() => handleOptionClick( option ) }
              style={ { ...styles.option,
                      borderBottom: i !== options.length - 1 ? `1px solid ${theme.text_color}`: 'none',
                      backgroundColor: selected === option ? `${theme.surface_a40}` : `${theme.surface_a10}`,
                  }}
                >
                  {option}
                </div>
          ))}
        </div>
      )}
    </div>
  );
};
