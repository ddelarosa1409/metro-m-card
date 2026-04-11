import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const session = getSession();
    setAuthenticated(!!session);
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="text-primary-foreground animate-spin" size={32} />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
