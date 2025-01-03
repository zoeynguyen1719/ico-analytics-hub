import { useState } from "react";
import SubscriptionTier from "./SubscriptionTier";
import { SubscriptionTierData } from "@/types/subscription";

interface SubscriptionTierListProps {
  onSubscribe: (priceId: string | null, tierName: string) => void;
  selectedTier: string | null;
}

export const SubscriptionTierList = ({ onSubscribe, selectedTier }: SubscriptionTierListProps) => {
  const tiers: SubscriptionTierData[] = [
    {
      name: "Basic",
      price: "Free",
      priceId: null,
      features: [
        "Access to basic ICO listings",
        "Limited portfolio tracking",
        "Basic calculator tools",
        "Public news feed"
      ],
      buttonText: "Get Started",
      highlighted: false
    },
    {
      name: "Premium",
      price: "$19/month",
      priceId: "price_1QbOJzQjoDZWLsXdFOX1Ubk1",
      features: [
        "All Basic features",
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

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {tiers.map((tier) => (
        <SubscriptionTier
          key={tier.name}
          {...tier}
          isSelected={selectedTier === tier.name}
          onSelect={() => onSubscribe(tier.priceId, tier.name)}
        />
      ))}
    </div>
  );
};