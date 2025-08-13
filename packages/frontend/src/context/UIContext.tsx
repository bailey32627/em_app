import { createContext, useContext, useState, ReactNode } from 'react';

type UIContextType = {
  isToolbarOpen: boolean;
  toggleToolbar: () => void;
  openToolbar: () => void;
  closeToolbar: () => void;
};

const UIContext = createContext< UIContextType | undefined>( undefined );

export const UIProvider = ({ children }: { children: ReactNode } ) => {
  const [ isToolbarOpen, setIsToolbarOpen ] = useState( true );

  const toggleToolbar = () => setIsToolbarOpen( prev => !prev );
  const openToolbar = () => setIsToolbarOpen( true );
  const closeToolbar = () => setIsToolbarOpen( false );

  return (
    <UIContext.Provider value ={{ isToolbarOpen, toggleToolbar, openToolbar, closeToolbar } } >
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
