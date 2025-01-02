import OverviewStats from "../overview/OverviewStats";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

const IntroductionSection = () => {
  return (
    <div className="min-h-screen bg-crypto-dark text-white">
      {/* Analytics Overview Section */}
      <div className="w-full bg-black">
        <div className="container mx-auto">
          <OverviewStats />
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default IntroductionSection;