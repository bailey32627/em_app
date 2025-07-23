import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared/src/context/AuthContext';

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // If not logged in, redirect to login
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Welcome, {user?.username}!</h1>
      <p>Organization: {user?.organization || 'None'}</p>

      <button onClick={logout} style={{ marginTop: 20, padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  );
}
