import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Panel from "./pages/PanelPage/Panel";
import Branches from "./pages/Branches/Branches";
import Units from "./pages/Units/Units";
import RoutesPage from "./pages/Routes/RoutesPage";
import Users from "./pages/Users/Users";
import Login from "./pages/Login/login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import OTPVerification from "./pages/VerificationPage/OTPVerification";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verification" element={<OTPVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="" element={<DashboardLayout />}>
        <Route path="/" element={<Panel />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/units" element={<Units />} />
        <Route path="/users" element={<Users />} />
        <Route path="/routes" element={<RoutesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
