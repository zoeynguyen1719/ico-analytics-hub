import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

const IntroductionSection = () => {
  return (
    <div className="min-h-screen bg-crypto-dark text-white">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default IntroductionSection;