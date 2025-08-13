import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared'; // adjust import path if needed

import { ToolBar, ToolBarItem } from '../components/ToolBar';
import { AiFillHome, AiFillCaretRight } from 'react-icons/ai';

import { useTheme } from '@em_app/shared';
import { MainContent } from '../components/MainContent';

export default function LoginPage() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleHome = () => {
    navigate( '/' );
  }

  const handleRegister = () => {
    navigate( '/register' );
  }

  const toolBarItems: ToolBarItem[] = [
    {
      title:'Home',
      onClick: handleHome,
      icon: <AiFillHome />
    },
    {
      title: 'Register',
      onClick: handleRegister,
      icon: <AiFillCaretRight />,
    },

  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      navigate('/dashboard'); // redirect to home or dashboard after login
    } catch (err: any) {
      // Show error message from backend or fallback generic message
      if (err.response?.data) {
        setError(err.response.data.detail || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '400px',
      margin: '3rem auto',
      padding: '1.5rem 1.5rem',
      backgroundColor: theme.surface_a10,
      borderRadius: '20px',
    },

    heading: {
      color: theme.text_color,
      textAlign: 'center',
      marginBottom: '2rem',
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
      border: `1px solid ${theme.surface_a50}`,
    },
    button: {
      padding: '0.75rem',
      fontSize: '1rem',
      borderRadius: '4px',
      backgroundColor: theme.primary_a0,
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

  return (
    <ToolBar items={ toolBarItems } >
      <MainContent >
        <div style={styles.container}>
          <h2 style={styles.heading}>Login</h2>

          <form onSubmit={handleLogin} style={styles.form}>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value) }
              style={ styles.input }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              style={ styles.input }
              onChange={(e) => setPassword( e.target.value ) }
              required
            />

            <br/>

            {error && <p style={styles.error}>{error}</p>}

            <button type="submit" onClick={handleLogin} disabled={loading} style={styles.button}>
              {loading ? 'logging in…' : 'Log In'}
            </button >
          </form>
        </div>
      </MainContent>
    </ToolBar>
  );
}
