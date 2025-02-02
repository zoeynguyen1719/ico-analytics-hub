import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuthState = (initialUser: any) => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = async (_event: string, session: any) => {
      try {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          if (_event === 'TOKEN_REFRESHED' || _event === 'SIGNED_OUT') {
            navigate('/signin');
            toast.error("Session expired. Please sign in again.");
          }
        }
      } catch (error: any) {
        console.error("Auth error:", error);
        if (error.message?.includes('refresh_token_not_found')) {
          navigate('/signin');
          toast.error("Session expired. Please sign in again.");
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { user, setUser };
};