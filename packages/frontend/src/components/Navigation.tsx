import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared';

import HomePage from '../pages/HomePage'; // replace with HomePage

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import RegisterPage from '../pages/RegisterPage';
import SystemUpgradePage from '../pages/SystemUpgradePage';
import ProfilePage from '../pages/ProfilePage';
import HVAPage from '../pages/HvaPage';

const Navigation: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user? <DashboardPage/> : <HomePage />}
        />

        <Route
          path="/register"
          element={user ? <DashboardPage/> : <RegisterPage />}
        />

        <Route
          path="/login"
          element={user ? <DashboardPage /> : <LoginPage />}
        />

        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" replace /> }
        />
        <Route
          path="/upgrade"
          element={user ? <SystemUpgradePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/hva"
          element={user ? <HVAPage /> : < Navigate to="/login" replace /> }
        />
      </Routes>
    </Router>
  );
};

export default Navigation;
