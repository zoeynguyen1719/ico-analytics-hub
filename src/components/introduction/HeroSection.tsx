import { ArrowRight, LogIn, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid md:grid-cols-4 gap-12">
        {/* Left Section - 1/4 width */}
        <div className="md:col-span-1 space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
            Welcome to Mericulum
          </h1>
          <p className="text-lg text-white">
            Your comprehensive platform for ICO analytics and portfolio management
          </p>
          <div className="flex flex-col gap-4">
            <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-crypto-dark">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10">
              Learn More
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

        {/* Right Section - 3/4 width */}
        <div className="md:col-span-3 bg-black/30 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-crypto-blue h-8 w-8" />
            <h2 className="text-2xl font-bold text-crypto-blue">Premium Tier Benefits</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Advanced Analytics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Detailed portfolio tracking</li>
                  <li>• Real-time ICO alerts</li>
                  <li>• Custom watchlists</li>
                  <li>• Performance metrics</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Premium Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Priority support</li>
                  <li>• Advanced market data</li>
                  <li>• Exclusive research reports</li>
                  <li>• Early access to new features</li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col justify-between">
              <img
                src="/lovable-uploads/5a1e8c44-11a1-4369-a816-17ef98d2501b.png"
                alt="Investment Growth Illustration"
                className="w-full max-w-md mx-auto mb-6"
              />
              <div className="text-center">
                <p className="text-2xl font-bold text-crypto-blue mb-4">$19/month</p>
                <Button 
                  className="w-full bg-crypto-green hover:bg-crypto-green/90 text-crypto-dark"
                  onClick={() => navigate('/subscription')}
                >
                  Upgrade to Premium <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;