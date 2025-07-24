import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@em_app/shared';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
//  const [ firstname, setFirstname ] = useState( '' );
//  const [ lastname, setLastname ] = useState( '' );
  const [ email, setEmail ] = useState( '' );
  const [ emailStatus, setEmailStatus ] = useState< 'checking' | 'available' | 'taken' | null>(null);
  const [ emailMessage, setEmailMessage ] = useState( '' );

  const [ username, setUsername ] = useState('');
  const [ usernameStatus, setUsernameStatus ] = useState<'checking' | 'available' | 'taken' | null>(null);
  const [ usernameMessage, setUsernameMessage ] = useState('');

  const [ password, setPassword ] = useState( '' );
  const [ passwordError, setPasswordError ] = useState( '' );

  const [ organization, setOrganization ] = useState( '' );

  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState( '' );


  // validate the password
  const validatePassword = ( value: string ) => {
    let error = "";

    if( value.length < 8 ) {
      error += "Password must be at least 8 characters.\n";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      error += "Password must contain at least one special character.\n";
    }
    if( !/[A-Z]/.test(value)) {
      error += "Password must contain at least one capital letter.\n";
    }
    if( !/\d/.test(value) ) {
      error += "Password must contain at least one number.\n";
    }

    return error;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const val = e.target.value;
    setPassword( val );
    setPasswordError( validatePassword( val ) );
  };


  // ensure thatt the username is unique
  const handleUsernameBlur = async () => {
    setUsernameStatus( 'checking' );
    if( !username )
      return;

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

  // ensure that the email address is unique
  const handleEmailBlur = async () => {
    setEmailStatus( 'checking' );
    if( !email) return;

    try {
      const res = await axios.get( `${API_BASE_URL}/api/check-email/`, {
        params: { email },
      });
      if( res.data.available ) {
        setEmailStatus( 'available' );
        setEmailMessage( 'Email is available' );
      } else {
        setEmailStatus( 'taken' );
        setEmailMessage( 'Eamil address is already in use' );
      }
    } catch ( err ) {
        console.error( 'Error checking email', err );
        setEmailStatus( null );
        setEmailMessage( 'Error checking email address' );
    }
  }

  // register the user
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
          onChange={(e) => setUsername(e.target.value) }
          onBlur={handleUsernameBlur} // check when user leaves field
          style={
            { ...styles.input,
              border: usernameStatus === 'taken' ? '2px solid red' :
                      usernameStatus === 'available' ? '3px solid green':
                      usernameStatus === 'checking' ? '1px solid #ccc' : '1px solid #ccc'
            }
          }
          required
        />
        {usernameStatus === 'taken' &&(
          <div
            style={{
              color: 'red',
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
          onChange={handlePasswordChange}
          style={{
            ...styles.input,
            border: passwordError ?  "2px solid red" : password ? "3px solid green" : "1px solid #ccc"
          }}
          required
        />
        { passwordError && (
          <p
          style={{
            color: 'red',
            marginTop: 4,
            whiteSpace: 'pre-wrap',
          }}
          > {passwordError}
            </p>
          )
        }

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur} // check when user leaves field
          style={{
            ...styles.input,
            border: emailStatus === 'taken' ? '2px solid red' :
                    emailStatus === 'available' ? '3px solid green':
                    emailStatus === 'checking' ? '1px solid #ccc' : '1px solid #ccc'
          }}
          required
        />
        {emailStatus === 'taken' && (
          <div
            style={{
              color : 'red',
              marginTop: 4,
            }}
          >
            {emailMessage}
          </div>
        )}
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
  errorBorder: {
    borderColor: 'red',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
};
