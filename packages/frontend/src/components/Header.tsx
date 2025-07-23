import React from 'react';
import { useAuth } from '@em_app/shared';
import { Link } from 'react-router-dom'; // Adjust if using a different router

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header style={styles.header}>
      <h1 style={styles.logo}>EM-Ops</h1>
      <nav style={styles.nav}>
        {user ? (
          <>
            <span style={styles.welcome}>Welcome, {user.username}</span>
            <button onClick={logout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1f2937',
    color: 'white',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
  welcome: {
    marginRight: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Header;
