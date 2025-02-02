import { Check } from "lucide-react";

interface TierFeaturesProps {
  features: string[];
}

const TierFeatures = ({ features }: TierFeaturesProps) => {
  return (
    <ul className="space-y-4 mb-8">
      {features.map((feature) => (
        <li key={feature} className="flex items-center text-gray-300">
          <Check className="h-5 w-5 text-crypto-blue mr-2 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default TierFeatures;