import React, { createContext, useContext, useState, ReactNode } from 'react';

type UIContextType = {
  isNavbarOpen: boolean;
  toggleNavbar: () => void;
  openNavbar: () => void;
  closeNavbar: () => void;
};

const UIContext = createContext< UIContextType | undefined>( undefined );

export const UIProvider = ({ children }: { children: ReactNode } ) => {
  const [ isNavbarOpen, setIsNavbarOpen ] = useState( false );

  const toggleNavbar = () => setIsNavbarOpen( prev => !prev );
  const openNavbar = () => setIsNavbarOpen( true );
  const closeNavbar = () => setIsNavbarOpen( false );

  return (
    <UIContext.Provider value ={{ isNavbarOpen, toggleNavbar, openNavbar, closeNavbar } } >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext( UIContext );
  if( !context ) {
    throw new Error( 'useUI must be used within a UIProvider');
  }
  return context;
};
