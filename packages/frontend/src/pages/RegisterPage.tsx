import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@em_app/shared/src/api/config';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [ firstname, setFirstname ] = useState( '' );
  const [ lastname, setLastname ] = useState( '' );
  const [ email, setEmail ] = useState( '' );

  const [ username, setUsername ] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'checking' | 'available' | 'taken' | null>(null);
  const [usernameMessage, setUsernameMessage] = useState('');

  const [ password, setPassword ] = useState( '' );

  const [ organization, setOrganization ] = useState( '' );

  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( '' );

  const handleUsernameBlur = async () => {
    if( !username ) return;

    setUsernameStatus( 'checking' );
    try {
      const res = await axios.get( `${API_BASE_URL}/api/check-username/`, {
        params: { username },
      });
      if( res.data.available ) {
        setUsernameStatus( 'available' );
        setUsernameMessage( 'Username is available' );
      } else {
        setUsernameStatus( 'taken' );
        setUsernameMessage( 'Username already taken' );
      }
    } catch ( err ) {
      console.error( 'Error checking username', err );
      setUsernameStatus(null);
      setUsernameMessage( 'Error checking username' );
    }
  };

  const handleRegister = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setLoading( true );
    setError( '' );

    try {
      await axios.post( `${API_BASE_URL}/api/register/`, {
        username,
        password,
        email,
        organization
      });

      // after successful register, redirect to login
      navigate( '/login' );
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const errors = err.response?.data;
        if (errors) {
          // Example: { email: ["Email already in use."], username: ["Username taken."] }
          // You can aggregate and show them:
          const messages = Object.entries(errors)
            .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(' ')}`)
            .join('\n');
          setError(messages);
        } else {
          setError('Registration failed. Please try again.');
        }
      } else {
        setError('Unexpected error occurred.');
      }
    } finally {
      setLoading( false );
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create an Account</h2>

      <form onSubmit={handleRegister} style={styles.form}>
        {error && <p style={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={handleUsernameBlur} // check when user leaves field
          style={styles.input}
          required
        />
        {usernameStatus && (
          <div
            style={{
              color: usernameStatus === 'available' ? 'green' : 'red',
              marginTop: 4,
            }}
            >
            {usernameMessage}
          </div>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Organization (optional)"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          style={styles.input}
        />

        <button type="submit" onClick={handleRegister} disabled={loading} style={styles.button}>
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default RegisterPage;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '400px',
    margin: '3rem auto',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    background: '#fff',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
};
