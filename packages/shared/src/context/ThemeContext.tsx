import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a sing theme
interface Theme {
  background: string;
  text_color: string;

  primary_a0: string;
  primary_a10: string;
  primary_a20: string;
  primary_a30: string;
  primary_a40: string;
  primary_a50: string;

  surface_a0: string;
  surface_a10: string;
  surface_a20: string;
  surface_a30: string;
  surface_a40: string;
  surface_a50: string;

  tonal_a0: string;
  tonal_a10: string;
  tonal_a20: string;
  tonal_a30: string;
  tonal_a40: string;
  tonal_a50: string;
}

const themes: Record <'light' | 'dark', Theme > = {

  light: {
    background: "#ffffff",
    text_color: "#000000",
    // use these for primary elements lik buttons, links etc
    primary_a0: "#ff7640",
    primary_a10: "#f27948",
    primary_a20: "#e57b50",
    primary_a30: "#d87c57",
    primary_a40: "#cb7e5e",
    primary_a50: "#bd7f65",

    // use these for surface elements like cards, backgrounds etc
    surface_a0: "#ffffff",
    surface_a10: "#f0f0f0",
    surface_a20: "#e1e1e1",
    surface_a30: "#d3d3d3",
    surface_a40: "#c5c5c5",
    surface_a50: "#b6b6b6",

    // variant for surfaces
    tonal_a0: "#fff2eb",
    tonal_a10: "#f0e5df",
    tonal_a20: "#e1d8d2",
    tonal_a30: "#d3cbc6",
    tonal_a40: "#c5beba",
    tonal_a50: "#b7b1ae",
  },

  dark: {
    background: "#121212",
    text_color: "#FFFFFF",
    // use these for primary elements lik buttons, links etc
    primary_a0: "#FF7640",
    primary_a10: "#FF8655",
    primary_a20: "#FF6969",
    primary_a30: "#FFA67E",
    primary_a40: "#FFB593",
    primary_a50: "#FFC4A8",

    // use these for surface elements like cards, backgrounds etc
    surface_a0: "#121212",
    surface_a10: "#282828",
    surface_a20: "#3f3f3f",
    surface_a30: "#575757",
    surface_a40: "#717171",
    surface_a50: "#8b8b8b",

    // variant for surfaces
    tonal_a0: "#3c251c",
    tonal_a10: "#503a31",
    tonal_a20: "#644f47",
    tonal_a30: "#79665f",
    tonal_a40: "#8e7e77",
    tonal_a50: "#a49691",
  },
};

// define what your context will provide
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// create teh context with an initial undefined
const ThemeContext = createContext< ThemeContextType | undefined >( undefined );

// props for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC< ThemeProviderProps > = ( { children } ) => {
  const [ currentTheme, setCurrentTheme ] = useState< 'light' | 'dark' >( 'light' );

  const toggleTheme = () => {
    setCurrentTheme( (prev) => (prev === 'light' ? 'dark' : 'light' ) );
  };

  const ThemeContextValue: ThemeContextType = {
    theme: themes[ currentTheme ],
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value = { ThemeContextValue }>
      {children }
    </ThemeContext.Provider>
  );
};

// custom hook for consuming the context
export const useTheme = (): ThemeContextType => {
  const context = useContext( ThemeContext );
  if( !context ) {
    throw new Error( 'useTheme must be used within a ThemeProvider.');
  }
  return context;
};
