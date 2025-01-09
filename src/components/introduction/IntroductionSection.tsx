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
              <Button 
                className="bg-crypto-blue hover:bg-crypto-blue/90 text-crypto-dark"
                onClick={() => navigate('/subscription')}
              >
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
          <Card className="relative p-8 bg-gradient-to-br from-[#1A3B47] via-[#2A4B57] to-[#1A3B47] border-2 border-crypto-blue/30 hover:border-crypto-green/50 transition-all duration-300 shadow-xl hover:shadow-crypto-blue/20">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-crypto-blue to-crypto-green px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                Premium Tier
              </span>
            </div>
            <div className="text-center space-y-8">
              <div className="flex justify-center">
                <div className="p-4 bg-crypto-blue/10 rounded-full">
                  <Crown className="h-12 w-12 text-crypto-blue animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white">
                Upgrade to Premium
              </h2>
              <ul className="text-left space-y-6">
                <li className="flex items-center text-white/90 hover:text-white transition-colors">
                  <div className="p-2 bg-crypto-green/10 rounded-full mr-3">
                    <Star className="h-5 w-5 text-crypto-green" />
                  </div>
                  <span>Advanced Portfolio Analytics</span>
                </li>
                <li className="flex items-center text-white/90 hover:text-white transition-colors">
                  <div className="p-2 bg-crypto-green/10 rounded-full mr-3">
                    <Award className="h-5 w-5 text-crypto-green" />
                  </div>
                  <span>Priority ICO Alerts</span>
                </li>
                <li className="flex items-center text-white/90 hover:text-white transition-colors">
                  <div className="p-2 bg-crypto-green/10 rounded-full mr-3">
                    <Sparkles className="h-5 w-5 text-crypto-green" />
                  </div>
                  <span>Exclusive Market Insights</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-crypto-blue to-crypto-green hover:opacity-90 text-crypto-dark font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
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
          <Button 
            size="lg" 
            className="bg-crypto-green hover:bg-crypto-green/90 text-crypto-dark"
            onClick={() => navigate('/subscription')}
          >
            Start Exploring Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionSection;