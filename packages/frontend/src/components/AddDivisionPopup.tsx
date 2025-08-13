import React, { useState } from 'react';

// theme
import { useTheme } from '@em_app/shared';
import { useAuth } from '@em_app/shared';

import { useCreateDivision } from '../hooks/useCreateDivision';

interface AddDivisionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}


export const AddDivisionPopup: React.FC< AddDivisionPopupProps > = ({ isOpen, onClose } ) => {
  const { theme } = useTheme();
  const [ name, setName ] = useState( "" );
  const { user } = useAuth();
  const { createDivision } = useCreateDivision();
  const [ message, setMessage ] = useState( "" );



  if( !isOpen || !user ) return null;

  const isUnique = () => {
    if( !name.trim() ) return false;
    for( const item of user.admin_divisions ){
      if( item.name.toLowerCase() === name.toLowerCase() ){
        setMessage( "Division names must be unique" );
        return false;
      }
    }
    return true;
  }

  const handleCreate = async ( e:React.FormEvent ) => {
    e.preventDefault();
    if( !name.trim() ) return;  // basic validation
    if( !isUnique() ) return;

    try {
      const response = await createDivision( name );

      setMessage( response.status );
    } catch( err ) {
      console.error( err );
      setMessage( `Failed to create division. Error: ${err}` );
    } finally {
      onClose();
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
    },
    title: {
      textAlign: 'center',
    },
    label: {
      display: 'inline-block',
      fontSize: '1.5rem',
    },
    input: {
      display: 'block',
      color: theme.text_color,
      padding: '8px',
      width: '95%',
      marginBottom:'10px',

    },
    button: {
      fontSize: '1.1rem',
      float: 'right',
      margin: '10px',
      border:  `1px solid ${theme.surface_a50}`,
      borderRadius: '8px',
      padding: '8px',
    },

  }


  return (
    <div style={ styles.container }>
      <h1 style={ styles.title}>Add A Division</h1>
      <form onSubmit={ handleCreate }>
        <div>
          <label style={{display:'block', fontSize: '1.5rem', marginBottom:'20px'}}><strong>Organization: </strong>{user.organization.name}</label>

          <input
            placeholder='New Division Name'
            type='text'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={ styles.input}
            required
          />
          { message && (
            <p>{message}</p>
          )}
          <div>
            <button type='submit' style={styles.button}>Add</button>
            <button style={styles.button} onClick={onClose}>Close</button>
          </div>
        </div>
      </form>

    </div>
  );
}
