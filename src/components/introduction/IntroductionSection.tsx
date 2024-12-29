import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const IntroductionSection = () => {
  const features = [
    "Real-time ICO Analytics Dashboard",
    "Portfolio Management Tools",
    "Project Comparison Features",
    "Latest Crypto News Updates",
    "Advanced ROI Calculations",
    "Premium Market Insights"
  ];

  return (
    <div className="min-h-screen bg-crypto-dark text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
              Welcome to Mericulum
            </h1>
            <p className="text-xl text-gray-300">
              Your comprehensive platform for ICO analytics and portfolio management
            </p>
            <div className="flex gap-4">
              <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-crypto-dark">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/lovable-uploads/ab1abe88-caf6-4bf7-800a-d8e8350cd6fe.png"
              alt="Crypto Investment Illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-crypto-gray py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-crypto-blue">
            Why Choose Mericulum?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-crypto-dark border-crypto-blue hover:border-crypto-green transition-colors">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-crypto-green flex-shrink-0" />
                  <p className="text-lg">{feature}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-crypto-blue">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of investors who trust Mericulum for their ICO analytics
            and portfolio management needs.
          </p>
          <Button size="lg" className="bg-crypto-green hover:bg-crypto-green/90 text-crypto-dark">
            Start Exploring Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;