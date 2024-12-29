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
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Mericulum
            </h1>
            <p className="text-xl text-gray-300">
              Your comprehensive platform for ICO analytics and portfolio management
            </p>
            <div className="flex gap-4">
              <Button className="bg-primary hover:bg-primary/90">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline">Learn More</Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="/lovable-uploads/mericulum-logo.png"
              alt="Mericulum Dashboard"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-crypto-gray py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Mericulum?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-crypto-dark border-crypto-gray">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
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
          <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of investors who trust Mericulum for their ICO analytics
            and portfolio management needs.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-black">
            Start Exploring Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;