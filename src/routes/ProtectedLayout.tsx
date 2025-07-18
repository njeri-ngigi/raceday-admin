import Header from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import "./ProtectedLayout.css";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const location = useLocation();

  if (isAuthLoading) {
    return <></>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
