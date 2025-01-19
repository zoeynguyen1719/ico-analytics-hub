import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  priceId,
  features,
  buttonText,
  highlighted,
  isSelected,
  onSelect,
}: SubscriptionTierProps) => {
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to subscribe");
        navigate("/signin");
        return;
      }

      // For the specific premium tier with Stripe checkout
      if (name.toLowerCase() === "premium") {
        window.location.href = "https://buy.stripe.com/5kA8wH0ZO5c7dnG8ww";
        return;
      }

      // For other tiers, use the existing selection logic
      onSelect();
    } catch (error) {
      console.error("Error handling subscription:", error);
      toast.error("Error processing subscription. Please try again.");
    }
  };

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
      {highlighted && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-crypto-blue text-white px-4 py-1 rounded-full text-sm">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold mb-2 text-crypto-blue">
          {name}
        </h3>
        <div className="text-3xl font-bold mb-4 text-white">{price}</div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-center text-gray-300">
            <Check className="h-5 w-5 text-crypto-blue mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

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
    </Card>
  );
};

export default SubscriptionTier;