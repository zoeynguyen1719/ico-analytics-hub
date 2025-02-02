import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSubscriptionHandler = (name: string, onSelect: () => void) => {
  const [showSignupDialog, setShowSignupDialog] = useState(false);
  const navigate = useNavigate();

  const getCheckoutUrl = (tierName: string) => {
    const urls = {
      premium: "https://buy.stripe.com/5kA8wH0ZO5c7dnG8ww",
      advanced: "https://buy.stripe.com/00g4gr8sg0VRdnG5kl"
    };
    return urls[tierName.toLowerCase() as keyof typeof urls];
  };

  const handleSignupSuccess = () => {
    toast.success("Account created! Please sign in to continue with your subscription.");
    navigate("/signin", { 
      state: { 
        redirectTo: "/subscription",
        tier: name.toLowerCase()
      } 
    });
  };

  const handleSubscribe = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const isStripeTier = ["premium", "advanced"].includes(name.toLowerCase());
      
      if (isStripeTier) {
        if (!session) {
          setShowSignupDialog(true);
          return;
        }
        window.location.href = getCheckoutUrl(name);
        return;
      }

      if (!session) {
        toast.error("Please sign in to subscribe");
        navigate("/signin", { 
          state: { 
            redirectTo: "/subscription",
            tier: name.toLowerCase()
          } 
        });
        return;
      }

      onSelect();
    } catch (error) {
      console.error("Error handling subscription:", error);
      toast.error("Error processing subscription. Please try again.");
    }
  };

  return {
    showSignupDialog,
    setShowSignupDialog,
    handleSubscribe,
    handleSignupSuccess
  };
};