import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./hook/useAuth";
import LoadingSpinner from "../common/loadingSpinner";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, user, loading, error, initializeAuth } = useAuth();
  useEffect(() => {
    if (!isAuthenticated && loading && !error) {
      initializeAuth();
    }
  }, [loading, isAuthenticated, error, initializeAuth]);
  const navigate = useNavigate();
  if (loading)
    <>
      <LoadingSpinner />
    </>;

  if (!isAuthenticated || user?.rule === "customer") {
    
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: { from: window.location.pathname },
      });
    } else {
      navigate("/403", { replace: true });
    }
    return null;
  }
  return <>{children}</>;
};

export default AuthGuard;
