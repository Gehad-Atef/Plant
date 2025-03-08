import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserProvider";

export const AuthGuard = () => {
  const { isLoading, isAuthenticated } = useUserContext();

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicGuard = () => {
  const { isLoading, isAuthenticated } = useUserContext();

  if (isLoading) return <div>Loading...</div>;
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export const RoleGuard = ({ allowedRoles }) => {
  const { user } = useUserContext();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-found" replace />;
  }
  return <Outlet />;
};
