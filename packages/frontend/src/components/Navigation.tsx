import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@em_app/shared';

import HomePage from '../pages/HomePage'; // replace with HomePage

import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import HVAPage from '../pages/HvaPage';

import CreateOrgPage from '../pages/CreateOrgPage';
import OrgManagementPage from '../pages/OrgManagementPage';
import DivisionManagementPage from '../pages/DivisionManagementPage';
import FacilityManagementPage from '../pages/FacilityManagementPage';


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
          path="/create_organization"
          element={user ? user.organization.is_owner ? <OrgManagementPage /> : <CreateOrgPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/organization_management"
          element={user ? user.organization.is_owner ? <OrgManagementPage /> : <DashboardPage /> : <Navigate to="/login" replace />}
        />
        {/*}
        <Route
          path="/division_management"
          element={user ? user.is_division_admin ? <DivisionManagementPage /> : <DashboardPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/facility_management"
          element={user ? user.is_facility_admin ? <FacilityManagementPage /> : <DashboardPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/hva"
          element={user ? <HVAPage /> : < Navigate to="/login" replace /> }
        />
        */}

      </Routes>
    </Router>
  );
};

export default Navigation;
