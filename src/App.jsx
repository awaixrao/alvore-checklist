import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Panel from "./pages/PanelPage/Panel";
import Branches from "./pages/Branches/Branches";
import Units from "./pages/Units/Units";
import RoutesPage from "./pages/Routes/RoutesPage";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/login";
// import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import OTPVerification from "./pages/VerificationPage/OTPVerification";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ChecklistPage from "./pages/Checklist/ChecklistPage";
import ProtectedRoute from "./ProtectedRoute"; // Import ProtectedRoute
import PublicRoute from "./PublicRoute"; // Import PublicRoute
import Reports from "./pages/Reports/Reports";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      {/* <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      /> */}
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/verification"
        element={
          <PublicRoute>
            <OTPVerification />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path=""
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Panel />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/units" element={<Units />} />
        <Route path="/users" element={<Users />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}

export default App;
