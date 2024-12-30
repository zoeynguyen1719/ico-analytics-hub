import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
        onClick={onSelect}
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