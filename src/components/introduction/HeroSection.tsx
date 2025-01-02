import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
            Welcome to Mericulum
          </h1>
          <p className="text-xl text-white">
            Your comprehensive platform for ICO analytics and portfolio management
          </p>
          <div className="flex flex-wrap gap-4">
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
        <div className="relative">
          <img
            src="/lovable-uploads/5a1e8c44-11a1-4369-a816-17ef98d2501b.png"
            alt="Investment Growth Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;