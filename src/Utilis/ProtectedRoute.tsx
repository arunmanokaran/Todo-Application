import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Utilis/AuthProvider"; // Adjust the path as needed

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;