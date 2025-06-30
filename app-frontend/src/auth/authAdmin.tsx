import { useEffect, type PropsWithChildren } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hook/useAuth";
import LoadingSpinner from "$/common/loadingSpinner";

const AdminAuth = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, user, loading, initializeAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && loading) {
      initializeAuth();
    }
  }, [isAuthenticated, loading, initializeAuth]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || user?.rule !== "admin") {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: { from: window.location.pathname },
      });
    } else {
      navigate("/403-forbidden", { replace: true });
    }
    if (isAuthenticated && user?.rule !== "admin") {
      navigate("/403-forbidden");
    }
    return null;
  }

  return children ? { children } : <Outlet />;
};

export default AdminAuth;
