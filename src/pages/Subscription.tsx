import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import SubscriptionTier from "@/components/subscription/SubscriptionTier";
import PremiumSignupDialog from "@/components/subscription/PremiumSignupDialog";
import AdvancedSignupDialog from "@/components/subscription/AdvancedSignupDialog";
import { supabase } from "@/integrations/supabase/client";

const SubscriptionPage = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showPremiumSignupDialog, setShowPremiumSignupDialog] = useState(false);
  const [showAdvancedSignupDialog, setShowAdvancedSignupDialog] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);

  const tiers = [
    {
      name: "Premium",
      price: "$19/month",
      priceId: "price_1QbOJzQjoDZWLsXdFOX1Ubk1",
      features: [
        "Advanced portfolio analytics",
        "Priority ICO alerts",
        "Detailed project comparisons",
        "Premium news access"
      ],
      buttonText: "Subscribe Now",
      highlighted: true
    },
    {
      name: "Advanced",
      price: "$49/month",
      priceId: "price_1QbOKNQjoDZWLsXdnELR9mD5",
      features: [
        "All Premium features",
        "API access",
        "Custom alerts",
        "Priority support",
        "Early access to new features",
        "Advanced market analytics"
      ],
      buttonText: "Subscribe Now",
      highlighted: false
    }
  ];

  const handleSubscribe = async (priceId: string | null, tierName: string) => {
    setSelectedTier(tierName);
    setSelectedPriceId(priceId);
    
    switch(tierName) {
      case "Premium":
        setShowPremiumSignupDialog(true);
        break;
      case "Advanced":
        setShowAdvancedSignupDialog(true);
        break;
    }
  };

  const handleStripeCheckout = async (userId: string) => {
    if (!selectedPriceId) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({ 
            priceId: selectedPriceId,
            userId 
          })
        }
      );

      const { url, error } = await response.json();
      
      if (error) {
        toast.error('Error creating checkout session');
        return;
      }

      window.location.href = url;
    } catch (error) {
      toast.error('Error processing subscription');
      console.error('Subscription error:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-crypto-blue mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
          {tiers.map((tier) => (
            <SubscriptionTier
              key={tier.name}
              {...tier}
              isSelected={selectedTier === tier.name}
              onSelect={() => handleSubscribe(tier.priceId, tier.name)}
            />
          ))}
        </div>
        
        <PremiumSignupDialog
          open={showPremiumSignupDialog}
          onOpenChange={setShowPremiumSignupDialog}
          onSuccess={handleStripeCheckout}
        />
        
        <AdvancedSignupDialog
          open={showAdvancedSignupDialog}
          onOpenChange={setShowAdvancedSignupDialog}
          onSuccess={handleStripeCheckout}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;