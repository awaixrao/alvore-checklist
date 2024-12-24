import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((store) => store.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // check token expiry if token expire then auto logout user
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return isAuthenticated == false ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
