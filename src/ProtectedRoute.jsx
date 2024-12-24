import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { logout } from "./features/AuthSlice/authSlice";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // check token expiry if token expire then auto logout user
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logout());
        navigate("/login");
      }
    }
  }, [token, navigate]);

  return isAuthenticated == true ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
