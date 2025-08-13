import React, { useState } from 'react';

// theme
import { useTheme } from '@em_app/shared';
import { useAuth } from '@em_app/shared';

import { useDeleteDivision } from '../hooks/useDeleteDivision';

interface DeleteDivisionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}


export const DeleteDivisionPopup: React.FC< DeleteDivisionPopupProps > = ({ isOpen, onClose } ) => {
  const { theme } = useTheme();
  const { user, selectedDivision, setSelectedDivision } = useAuth();
  const { deleteDivision } = useDeleteDivision();
  const [ message, setMessage ] = useState( "" );



  if( !isOpen || !user ) return null;


  const handleDelete = async ( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if( !selectedDivision ) return;
    try {
      const name = selectedDivision.name;
      await deleteDivision( selectedDivision.id );
      setMessage( `"${name}" successfully deleted.`);
      setSelectedDivision( null );
    } catch (err) {
      console.error( err );
      setMessage( 'Failed to delete the division' );
    }
  }



  const styles: { [ key: string ]: React.CSSProperties } = {
    container: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate( -50%, -50%)',
      padding: '15px',
      border: `1px solid ${theme.surface_a50}`,
      zIndex: 1000,
      backgroundColor: theme.surface_a20,
      width: '50%',
      borderRadius: '10px',
      color: theme.text_color,
      textAlign: 'center',
    },
    button: {
      fontSize: '1.1rem',
      textAlign: 'center',
      margin: '10px',
      border:  `1px solid ${theme.surface_a50}`,
      borderRadius: '8px',
      padding: '8px',
    },

  }

  if( !selectedDivision ) {
    return (
      <div style={ styles.container }>
        <p style={styles.p}>{message}</p>
        <button style={styles.button} onClick={onClose}>Close</button>
      </div>
    )
  }

  return (
    <div style={ styles.container }>
      <h1 style={ styles.title}>Delete Division: { selectedDivision ? selectedDivision.name : ""}</h1>
        <form onSubmit={ handleDelete }>
          <div>
            <p> Select 'Delete' to remove the division.</p>
            <p> { message } </p>
          </div>
          <div>
            <button type='submit' style={styles.button}>Delete</button>
            <button style={styles.button} onClick={onClose}>Close</button>
          </div>
        </form>
    </div>
  );
}
