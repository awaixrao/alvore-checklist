import React, { Suspense } from "react";
import "./services/i18n"; // 🔹 Import i18n globally
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DashboardLayout from "./layouts/DashboardLayout";
import Panel from "./pages/PanelPage/Panel";
import Branches from "./pages/Branches/Branches";
import Units from "./pages/Units/Units";
import RoutesPage from "./pages/Routes/RoutesPage";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import OTPVerification from "./pages/VerificationPage/OTPVerification";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ChecklistPage from "./pages/Checklist/ChecklistPage";
import Reports from "./pages/Reports/Reports";
import Setting from "./pages/Settings/Setting";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function App() {
  const { t } = useTranslation(); // 🔹 i18n hook for translations

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/verification" element={<PublicRoute><OTPVerification /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        {/* 🔒 Protected Routes (Dashboard) */}
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Panel />} />
          <Route path="branches" element={<Branches />} />
          <Route path="units" element={<Units />} />
          <Route path="users" element={<Users />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="checklist" element={<ChecklistPage />} />
          <Route path="reports" element={<Reports />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
