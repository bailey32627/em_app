import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared';

import { Navbar } from '../components/Navbar';
import { MainContent } from '../components/MainContent';
import { DashboardPageLinks } from '../components/LinkData';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      // If not logged in, redirect to login
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <Navbar links={ DashboardPageLinks }>
      <MainContent>

      </MainContent>
    </Navbar>
  );
}
