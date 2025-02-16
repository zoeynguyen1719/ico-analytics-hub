import { Card } from "@/components/ui/card";
import { Rocket, Star, Award, Sparkles, Heart, Leaf } from "lucide-react";
const features = [{
  text: "Real-time ICO Analytics Dashboard",
  icon: Rocket
}, {
  text: "Portfolio Management Tools",
  icon: Star
}, {
  text: "Project Comparison Features",
  icon: Award
}, {
  text: "Latest Crypto News Updates",
  icon: Sparkles
}, {
  text: "Advanced ROI Calculations",
  icon: Heart
}, {
  text: "Premium Market Insights",
  icon: Leaf
}];
const FeaturesSection = () => {
  return <div className="bg-crypto-gray py-16 my-[20px]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-crypto-blue">
          Why Choose Mericulum?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => <Card key={index} className="p-6 bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-colors cursor-rocket">
              <div className="flex items-start gap-4">
                <feature.icon className="h-6 w-6 text-crypto-green flex-shrink-0" />
                <p className="text-lg text-white">{feature.text}</p>
              </div>
            </Card>)}
        </div>
      </div>
    </div>;
};
export default FeaturesSection;