import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SignupDialog from "./SignupDialog";
import TierHeader from "./TierHeader";
import TierFeatures from "./TierFeatures";
import { useSubscriptionHandler } from "./useSubscriptionHandler";

interface SubscriptionTierProps {
  name: string;
  price: string;
  priceId: string | null;
  features: string[];
  buttonText: string;
  highlighted: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

const SubscriptionTier = ({
  name,
  price,
  features,
  buttonText,
  highlighted,
  isSelected,
  onSelect,
}: SubscriptionTierProps) => {
  const {
    showSignupDialog,
    setShowSignupDialog,
    handleSubscribe,
    handleSignupSuccess
  } = useSubscriptionHandler(name, onSelect);

  return (
    <Card
      className={`relative p-8 rounded-xl border ${
        isSelected
          ? "border-crypto-blue bg-crypto-dark"
          : highlighted
          ? "border-crypto-blue bg-black/50"
          : "border-crypto-gray bg-black/30"
      }`}
    >
      <TierHeader 
        name={name} 
        price={price} 
        highlighted={highlighted} 
      />

      <TierFeatures features={features} />

      <Button
        onClick={handleSubscribe}
        className={`w-full ${
          isSelected
            ? "bg-crypto-blue hover:bg-crypto-blue/90"
            : highlighted
            ? "bg-crypto-blue hover:bg-crypto-blue/90"
            : "bg-gray-800 hover:bg-gray-700"
        }`}
      >
        {buttonText}
      </Button>

      {(name.toLowerCase() === "premium" || name.toLowerCase() === "advanced") && (
        <SignupDialog
          open={showSignupDialog}
          onOpenChange={setShowSignupDialog}
          onSuccess={handleSignupSuccess}
          tier={name.toLowerCase() as 'premium' | 'advanced'}
          title={`Sign Up for ${name} Plan`}
          description={`Create your account to access ${name.toLowerCase()} features`}
        />
      )}
    </Card>
  );
};

export default SubscriptionTier;