import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseSignupProps {
  onSuccess?: (userId: string) => void;
  onOpenChange: (open: boolean) => void;
  tier: 'basic' | 'premium' | 'advanced';
}

export const useSignup = ({ onSuccess, onOpenChange, tier }: UseSignupProps) => {
  const [loading, setLoading] = useState(false);

  const handleSignup = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            subscription_tier: tier
          },
          emailRedirectTo: `${window.location.origin}/signin`
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        toast.error(authError.message);
        return;
      }

      if (!authData.user) {
        console.error('No user data returned');
        toast.error("Failed to create user account");
        return;
      }

      if (tier === 'basic') {
        await handleBasicSignup(email, authData.user.id);
      } else {
        toast.success("Account created successfully!");
        onSuccess?.(authData.user.id);
      }

      onOpenChange(false);
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error(error.message || "Error during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBasicSignup = async (email: string, userId: string) => {
    // Small delay to ensure user creation is complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { error: signupError } = await supabase
      .from('basic_signups')
      .insert([{ 
        email,
        user_id: userId
      }]);

    if (signupError) {
      console.error('Signup error:', signupError);
      // If this fails, we should still let the user know to check their email
      console.warn('Failed to create basic signup record, but user account was created');
    }

    toast.success("Please check your email to confirm your account. You will be redirected to sign in after confirmation.");
  };

  return {
    loading,
    handleSignup
  };
};