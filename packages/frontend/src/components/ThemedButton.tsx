import React, { ReactNode, useState } from 'react';
import { useTheme } from '@em_app/shared';

interface IconButtonProps {
  icon: ReactNode;   // any react element like <FaHome />
  onClick?: () => void;
  size?: number;     // optional size for padding
}


export const ThemedButton: React.FC< IconButtonProps > = ({ icon, onClick, size=40, }) => {
  const { theme } = useTheme();
  const [ hovered, setHovered ] = useState( false );

  const styles: { [key: string]: React.CSSProperties } = {
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "50%",
      border: `2px solid ${theme.text_color}`,
      backgroundColor: hovered ? theme.surface_a20 : theme.primary_a40,
      color: theme.text_color,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    icon: {
      fontSize: size * 0.5,
      color: theme.primary_a20,
    },
  };

  return (
    <button
    style={styles.button}
    onClick={onClick}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false) }
  >
    <span style={ styles.icon}>{icon}</span>
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
