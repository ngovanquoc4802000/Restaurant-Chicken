import { useNavigate } from "react-router-dom";
import { useAuth } from "./hook/useAuth";
import { useEffect, type PropsWithChildren } from "react";
import LoadingSpinner from "../../common/loadingSpinner";

const AdminAuthGuard = ({ children }: PropsWithChildren) => {
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
      navigate("/403", { replace: true }); // Or navigate to a default authenticated page
    }
    return null;
  }

  return <>{children}</>;
};

export default AdminAuthGuard;
