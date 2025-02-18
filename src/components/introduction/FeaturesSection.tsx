
import { Card } from "@/components/ui/card";
import { Brain, Activity, BarChart3, Layout, Share2, Database, Gem } from "lucide-react";

const features = [
  {
    title: "AI-Driven Predictive Analytics",
    description: "Make smarter decisions with our cutting-edge AI models that analyze historical data, on-chain activity, and market sentiment.",
    icon: Brain,
    advantage: "Get data-backed investment predictions"
  },
  {
    title: "Real-Time On-Chain Intelligence",
    description: "Track whale movements, smart contract interactions, and liquidity shifts with deep, real-time blockchain analytics.",
    icon: Activity,
    advantage: "Stay ahead with live blockchain data"
  },
  {
    title: "Institutional-Grade Market Insights",
    description: "Access advanced risk assessment, sector-wide comparisons, and exclusive research reports.",
    icon: BarChart3,
    advantage: "Gain professional-grade intelligence"
  },
  {
    title: "Customizable Dashboards & Alerts",
    description: "Create personalized dashboards, set smart alerts, and enjoy a seamless experience across all devices.",
    icon: Layout,
    advantage: "Control your data visualization"
  },
  {
    title: "AI-Powered Sentiment Analysis",
    description: "Stay informed with real-time sentiment analysis from social media and automated news tracking.",
    icon: Share2,
    advantage: "Get curated, AI-driven insights"
  },
  {
    title: "Web3-Enabled Portfolio Tracking",
    description: "Connect your wallet for real-time portfolio tracking, DeFi insights, and P&L calculations.",
    icon: Database,
    advantage: "One-click Web3 integration"
  }
];

const FeaturesSection = () => {
  return (
    <div className="relative bg-gradient-to-b from-crypto-dark via-crypto-gray to-crypto-dark py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-crypto-blue rounded-full blur-[150px]" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-crypto-green rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-crypto-blue via-white to-crypto-green bg-clip-text text-transparent">
            Why Choose Mericulum?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience the future of crypto analytics with our AI-powered platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative p-8 bg-crypto-dark/50 backdrop-blur-sm border-crypto-blue hover:border-crypto-green transition-all duration-300 overflow-hidden"
            >
              {/* Card background decoration */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-crypto-blue to-crypto-green" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-crypto-blue/10 border border-crypto-blue/20">
                    <feature.icon className="h-6 w-6 text-crypto-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-4 min-h-[80px]">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Gem className="h-4 w-4 text-crypto-green" />
                  <span className="text-crypto-green font-medium">{feature.advantage}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
