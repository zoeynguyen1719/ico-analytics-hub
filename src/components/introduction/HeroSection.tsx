import { ArrowRight, Crown, Star, Award, Sparkles, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
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
              className="bg-crypto-blue hover:bg-crypto-blue/90 text-crypto-dark cursor-rocket"
              onClick={() => navigate('/subscription')}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="border-crypto-green text-crypto-green hover:bg-crypto-green/10 cursor-rocket"
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
              className="w-full bg-gradient-to-r from-crypto-blue to-crypto-green hover:opacity-90 text-crypto-dark font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 cursor-rocket"
              onClick={() => navigate('/subscription')}
            >
              Upgrade Now <Crown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeroSection;