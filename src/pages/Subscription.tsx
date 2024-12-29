import { Check } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SubscriptionPage = () => {
  const tiers = [
    {
      name: "Basic",
      price: "Free",
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
      features: [
        "All Premium features",
        "API access",
        "Custom alerts",
        "Priority support",
        "Early access to new features",
        "Advanced market analytics"
      ],
      buttonText: "Contact Sales",
      highlighted: false
    }
  ];

  return (
    <DashboardLayout>
      <div className="py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-crypto-blue mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative p-8 rounded-xl border ${
                tier.highlighted
                  ? "border-crypto-blue bg-black/50"
                  : "border-crypto-gray bg-black/30"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-crypto-blue text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2 text-crypto-blue">
                  {tier.name}
                </h3>
                <div className="text-3xl font-bold mb-4 text-white">{tier.price}</div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-crypto-blue mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.highlighted
                    ? "bg-crypto-blue hover:bg-crypto-blue/90"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {tier.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;