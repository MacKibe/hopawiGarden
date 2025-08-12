import type { ReactNode } from "react";
import useAuthStore from "../../store/useAuthStore";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuthStore();
    
    if (isLoading) {
      return <div>Loading authentication...</div>;
    }
  
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

export default PrivateRoute