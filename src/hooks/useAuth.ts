import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from "@/lib/supabase";

interface AuthUser {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  cedula: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const session = auth.getSession();
    setUser(session);
    setLoading(false);
  }, []);

  const handleSignIn = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      setActionLoading(true);
      const { user: u, error } = await auth.signIn(email, password);
      setActionLoading(false);
      if (error) return error;
      setUser(u);
      navigate("/dashboard", { replace: true });
      return null;
    },
    [navigate]
  );

  const handleSignUp = useCallback(
    async (
      email: string,
      password: string,
      nombre: string,
      apellido: string,
      cedula: string
    ): Promise<string | null> => {
      setActionLoading(true);
      const { error } = await auth.signUp(email, password, nombre, apellido, cedula);
      setActionLoading(false);
      if (error) return error;
      return null;
    },
    []
  );

  const handleSignOut = useCallback(async () => {
    setActionLoading(true);
    await auth.signOut();
    setUser(null);
    setActionLoading(false);
    navigate("/login", { replace: true });
  }, [navigate]);

  return {
    user,
    loading,
    actionLoading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
}
