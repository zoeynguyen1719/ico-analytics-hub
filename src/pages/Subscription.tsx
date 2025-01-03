import DashboardLayout from "@/components/DashboardLayout";
import BasicSignupDialog from "@/components/subscription/BasicSignupDialog";
import PremiumSignupDialog from "@/components/subscription/PremiumSignupDialog";
import AdvancedSignupDialog from "@/components/subscription/AdvancedSignupDialog";
import { SubscriptionTierList } from "@/components/subscription/SubscriptionTierList";
import { useSubscription } from "@/hooks/useSubscription";
import { useState } from "react";

const SubscriptionPage = () => {
  const [showBasicSignupDialog, setShowBasicSignupDialog] = useState(false);
  const [showPremiumSignupDialog, setShowPremiumSignupDialog] = useState(false);
  const [showAdvancedSignupDialog, setShowAdvancedSignupDialog] = useState(false);
  
  const { selectedTier, handleSubscribe, handleStripeCheckout } = useSubscription();

  const handleTierSelection = async (priceId: string | null, tierName: string) => {
    const { tierName: selectedTierName } = await handleSubscribe(priceId, tierName);
    
    switch(selectedTierName) {
      case "Basic":
        setShowBasicSignupDialog(true);
        break;
      case "Premium":
        setShowPremiumSignupDialog(true);
        break;
      case "Advanced":
        setShowAdvancedSignupDialog(true);
        break;
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

        <SubscriptionTierList 
          onSubscribe={handleTierSelection}
          selectedTier={selectedTier}
        />
        
        <BasicSignupDialog
          open={showBasicSignupDialog}
          onOpenChange={setShowBasicSignupDialog}
        />
        
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