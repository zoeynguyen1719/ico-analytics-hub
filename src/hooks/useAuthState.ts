import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuthState = (initialUser: any) => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    // First, check the current session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error: any) {
        console.error("Session check error:", error);
        setUser(null);
      }
    };

    checkSession();

    // Then, set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session?.user?.email);
      
      try {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          
          // Only redirect and show toast for specific events
          if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
            navigate('/signin');
            if (event === 'TOKEN_REFRESHED') {
              toast.error("Session expired. Please sign in again.");
            }
          }
        }
      } catch (error: any) {
        console.error("Auth state change error:", error);
        
        // Handle specific error cases
        if (error.message?.includes('refresh_token_not_found')) {
          setUser(null);
          navigate('/signin');
          toast.error("Session expired. Please sign in again.");
        } else {
          toast.error("Authentication error. Please try again.");
        }
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { user, setUser };
};