import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared';

import Header from '../components/Header';
import RegisterPage from '../pages/RegisterPage';

import Home from '../pages/Home'; // replace with HomePage

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

import RegisterPage from '../pages/RegisterPage';

const Navigation: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
=======
        <Route  path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<Login />} />
>>>>>>> main
        <Route
          path="/dashboard"
          element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
        />
<<<<<<< HEAD
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />
=======
>>>>>>> main
      </Routes>
    </Router>
  );
};

export default Navigation;
