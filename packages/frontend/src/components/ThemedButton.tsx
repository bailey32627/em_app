import React, { useState } from 'react';
import { useTheme } from '@em_app/shared';

interface ThemedButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}


export const ThemedButton: React.FC< ThemedButtonProps > = ({ onClick, children, style }) => {
  const { theme } = useTheme();
  const [ hovered, setHovered ] = useState( false );

  const styles: { [key: string]: React.CSSProperties } = {
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      border: `2px solid ${theme.primary_a0}`,
      backgroundColor: hovered ?  theme.primary_a40 : theme.surface_a20,
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
