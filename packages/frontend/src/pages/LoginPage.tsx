import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared'; // adjust import path if needed

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Login</h1>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        autoComplete="username"
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />

      <button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
