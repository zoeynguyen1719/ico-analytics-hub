
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import SubscriptionTier from "@/components/subscription/SubscriptionTier";
import BasicSignupDialog from "@/components/subscription/BasicSignupDialog";
import PremiumSignupDialog from "@/components/subscription/PremiumSignupDialog";
import AdvancedSignupDialog from "@/components/subscription/AdvancedSignupDialog";
import { supabase } from "@/integrations/supabase/client";

const tiers = [
  {
    name: "Basic",
    tierKey: "basic",
    description: "Perfect for getting started",
    price: "Free",
    priceId: null,
    buttonText: "Get Started",
    highlighted: false,
    features: [
      "Basic market analysis",
      "Limited API access",
      "Community support",
      "Basic portfolio tracking"
    ]
  },
  {
    name: "Premium",
    tierKey: "premium",
    description: "For serious traders",
    price: "$49/month",
    priceId: "price_premium",
    buttonText: "Upgrade Now",
    highlighted: true,
    features: [
      "Advanced market analysis",
      "Full API access",
      "Priority support",
      "Advanced portfolio tracking",
      "Real-time alerts"
    ]
  },
  {
    name: "Advanced",
    tierKey: "advanced",
    description: "For professional traders",
    price: "$99/month",
    priceId: "price_advanced",
    buttonText: "Go Pro",
    highlighted: false,
    features: [
      "Everything in Premium",
      "Custom API solutions",
      "Dedicated support",
      "White-label options",
      "Custom integrations"
    ]
  }
];

const SubscriptionPage = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showBasicSignupDialog, setShowBasicSignupDialog] = useState(false);
  const [showPremiumSignupDialog, setShowPremiumSignupDialog] = useState(false);
  const [showAdvancedSignupDialog, setShowAdvancedSignupDialog] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string | null, tierName: string) => {
    setSelectedTier(tierName);
    setSelectedPriceId(priceId);

    if (tierName.toLowerCase() === 'basic') {
      setShowBasicSignupDialog(true);
    } else if (tierName.toLowerCase() === 'premium') {
      setShowPremiumSignupDialog(true);
    } else if (tierName.toLowerCase() === 'advanced') {
      setShowAdvancedSignupDialog(true);
    }
  };

  const handleStripeCheckout = async (userId: string) => {
    if (!selectedPriceId) {
      toast.error('No subscription plan selected');
      return;
    }

    if (!userId) {
      toast.error('User not authenticated');
      return;
    }

    try {
      console.log('Creating checkout session for user:', userId);
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
        const successUrl = new URL(response.data.url);
        successUrl.searchParams.set('success', 'true');
        window.location.href = successUrl.toString();
      } else {
        console.error('Invalid checkout response:', response.data);
        toast.error('Invalid checkout response');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Error processing subscription');
    }
  };

  useEffect(() => {
    const fetchCurrentSubscription = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching subscription:', error);
        return;
      }

      if (data) setCurrentSubscription(data.tier);
    };

    fetchCurrentSubscription();

    const query = new URLSearchParams(window.location.search);
    if (query.get('success') === 'true') {
      fetchCurrentSubscription();
      toast.success('Subscription updated successfully!');
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="py-8 min-h-screen bg-gradient-dark from-crypto-gradient-from to-crypto-gradient-to">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-crypto-blue mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {tiers.map((tier) => (
            <SubscriptionTier
              key={tier.name}
              {...tier}
              isSelected={currentSubscription === tier.tierKey || selectedTier === tier.name}
              onSelect={() => handleSubscribe(tier.priceId, tier.name)}
            />
          ))}
        </div>
        
        <BasicSignupDialog
          open={showBasicSignupDialog}
          onOpenChange={(open) => {
            setShowBasicSignupDialog(open);
            if (!open) setSelectedTier(null);
          }}
        />

        <PremiumSignupDialog
          open={showPremiumSignupDialog}
          onOpenChange={(open) => {
            setShowPremiumSignupDialog(open);
            if (!open) setSelectedTier(null);
          }}
          onSuccess={handleStripeCheckout}
        />

        <AdvancedSignupDialog
          open={showAdvancedSignupDialog}
          onOpenChange={(open) => {
            setShowAdvancedSignupDialog(open);
            if (!open) setSelectedTier(null);
          }}
          onSuccess={handleStripeCheckout}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
