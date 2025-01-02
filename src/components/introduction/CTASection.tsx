import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
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
  );
};

export default CTASection;