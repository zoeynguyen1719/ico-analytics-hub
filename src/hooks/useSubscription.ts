import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useSubscription = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string | null, tierName: string) => {
    setSelectedTier(tierName);
    setSelectedPriceId(priceId);
    return { tierName };
  };

  const handleStripeCheckout = async (userId: string) => {
    if (!selectedPriceId) return;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        toast.error('Authentication required');
        return;
      }

      const response = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId: selectedPriceId,
          userId 
        }
      });

      if (response.error) {
        console.error('Checkout error:', response.error);
        toast.error('Error creating checkout session');
        return;
      }

      if (response.data?.url) {
        window.location.href = response.data.url;
      } else {
        toast.error('Invalid checkout response');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Error processing subscription');
    }
  };

  return {
    selectedTier,
    handleSubscribe,
    handleStripeCheckout
  };
};