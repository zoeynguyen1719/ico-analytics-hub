import { ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/lovable-uploads/1f1b7894-c97b-48df-9bbc-12bb865c97d4.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          mixBlendMode: 'screen',
          filter: 'blur(2px)',
        }}
      />

      {/* Gradient Orb Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1">
        <div className="w-[500px] h-[500px] rounded-full bg-crypto-blue/20 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Together, we are bigger
          <br />
          <span className="bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
            Than ICO Market
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          Your comprehensive platform for ICO analytics and portfolio management. Join thousands of investors who trust Mericulum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button 
            size="lg"
            className="bg-crypto-blue hover:bg-crypto-blue/90 text-crypto-dark min-w-[200px] h-14 text-lg cursor-rocket backdrop-blur-sm"
            onClick={() => navigate('/subscription')}
          >
            Access App <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline" 
            className="border-crypto-green text-crypto-green hover:bg-crypto-green/10 min-w-[200px] h-14 text-lg cursor-rocket backdrop-blur-sm"
            onClick={() => navigate('/signin')}
          >
            Sign In <LogIn className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-20 z-[2]" />
    </div>
  );
};

export default HeroSection;