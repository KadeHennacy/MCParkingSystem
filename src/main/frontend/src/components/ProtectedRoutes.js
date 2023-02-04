import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectRoutes = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  return authenticated ? <Outlet /> : <Navigate to="/login" exact />;
};
