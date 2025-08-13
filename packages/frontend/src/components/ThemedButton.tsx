import React, { useState } from 'react';
import { useTheme } from '@em_app/shared';

interface ThemedButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}


export const ThemedButton: React.FC< ThemedButtonProps > = ({ onClick, children, disabled, style }) => {
  const { theme } = useTheme();
  const [ hovered, setHovered ] = useState( false );

  const styles: { [key: string]: React.CSSProperties } = {
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      border: `1px solid ${theme.surface_a50}`,
      backgroundColor: hovered ?  theme.surface_a50 : theme.surface_a10,
      color: theme.text_color,
      cursor: "pointer",
      transition: "all 0.2s ease",
    }
  };

  return (
    <button
    style={{ ...styles.button, ...style} }
    onClick={onClick}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false) }
    disabled={disabled}
  >
    {children}
  </button>
  );
};


// import { FaHome } from "react-icons/fa";
// import { IconButton } from "./IconButton";

// export default function MyHeader() {
//  return (
//    <div style={{ padding: "1rem" }}>
//      <ThemedButton
//        icon={<FaHome />}
//        onClick={() => console.log("Home clicked!")}
//      />
//    </div>
//  );
//}
