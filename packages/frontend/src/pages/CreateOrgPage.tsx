import React, { useState } from 'react';
import { useCreateOrganization } from '../hooks/useCreateOrganization';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '@em_app/shared';


const CreateOrgPage = () => {
  const [ name, setName ] = useState('');
  const [ loading, setLoading ] = useState( false );
  const { createOrganization } = useCreateOrganization();
  const navigate = useNavigate();
  const { user } = useAuth();

  if( user && user.organization ) {
    return <p>You are affiiliated with an Organization</p>
  }

  const handleCreate = async () => {
    if( !name.trim() ) return;
    setLoading( true );
    try{
      const data = await createOrganization( name );
      alert( `Organization "${data.organization.name}" created!` );
      navigate( '/org_management' );
    } catch ( err ) {
      console.error( err );
      alert( 'Failed to create organization.' );
    } finally {
      setLoading( false );
    }
  };

  return (
    <div>
      <h1>Create Organization</h1>
      <input
        placeholder="Organization Name"
        value={name}
        onChange={ (e)=> setName( e.target.value )}
      />
      <button onClick={handleCreate} disabled={loading}>
        {loading ? 'Creating....' : 'Create Organization' }
      </button>
    </div>
  )

}

export default CreateOrgPage;
