import { ArrowRight, Rocket, Star, Award, Sparkles, Heart, Leaf, LogIn, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const IntroductionSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      text: "Real-time ICO Analytics Dashboard",
      icon: Rocket,
    },
    {
      text: "Portfolio Management Tools",
      icon: Star,
    },
    {
      text: "Project Comparison Features",
      icon: Award,
    },
    {
      text: "Latest Crypto News Updates",
      icon: Sparkles,
    },
    {
      text: "Advanced ROI Calculations",
      icon: Heart,
    },
    {
      text: "Premium Market Insights",
      icon: Leaf,
    }
  ];

  return (
    <div className="min-h-screen bg-crypto-dark text-white">
      {/* Hero Section with Split Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Half - Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
              Welcome to Mericulum
            </h1>
            <p className="text-lg text-white">
              Your comprehensive platform for ICO analytics and portfolio management
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-crypto-dark">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="border-crypto-green text-crypto-green hover:bg-crypto-green/10"
                onClick={() => navigate('/signin')}
              >
                Sign In <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Half - Premium Promotion */}
          <Card className="p-8 bg-crypto-gray/50 border-crypto-blue hover:border-crypto-green transition-colors">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Crown className="h-12 w-12 text-crypto-blue" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Upgrade to Premium
              </h2>
              <ul className="text-left space-y-4">
                <li className="flex items-center text-white">
                  <Star className="h-5 w-5 text-crypto-green mr-2" />
                  <span>Advanced Portfolio Analytics</span>
                </li>
                <li className="flex items-center text-white">
                  <Award className="h-5 w-5 text-crypto-green mr-2" />
                  <span>Priority ICO Alerts</span>
                </li>
                <li className="flex items-center text-white">
                  <Sparkles className="h-5 w-5 text-crypto-green mr-2" />
                  <span>Exclusive Market Insights</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-crypto-green hover:bg-crypto-green/90 text-crypto-dark"
                onClick={() => navigate('/subscription')}
              >
                Upgrade Now <Crown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
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
                  <feature.icon className="h-6 w-6 text-crypto-green flex-shrink-0" />
                  <p className="text-lg text-white">{feature.text}</p>
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
          <p className="text-xl text-white max-w-2xl mx-auto">
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