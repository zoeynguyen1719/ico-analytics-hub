import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSubscriptionTier = (user: any) => {
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkSubscriptionTier = async (user: any) => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // First check subscriptions table using user_id
      const { data: subData, error: subError } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', user.id)
        .maybeSingle();

      if (subError) {
        console.error('Error checking subscription:', subError);
        toast.error('Error checking subscription status. Please try again.');
        return;
      }

      if (subData) {
        setSubscriptionTier(subData.tier);
      } else {
        // If no subscription found, check basic_signups using email
        const { data: basicData, error: basicError } = await supabase
          .from('basic_signups')
          .select('email')
          .eq('email', user.email)
          .maybeSingle();

        if (basicError) {
          console.error('Error checking basic signup:', basicError);
          toast.error('Error checking subscription status. Please try again.');
          return;
        }

        if (basicData) {
          setSubscriptionTier('basic');
        }
      }
    } catch (error) {
      console.error('Error in checkSubscriptionTier:', error);
      toast.error('Error checking subscription status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      checkSubscriptionTier(user);
    }
  }, [user]);

  return { subscriptionTier, setSubscriptionTier, checkSubscriptionTier, isLoading };
};