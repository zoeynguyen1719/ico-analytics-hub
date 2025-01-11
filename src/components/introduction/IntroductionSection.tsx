import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";
import OverviewStats from "../overview/OverviewStats";

const IntroductionSection = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <div className="mt-20">
        <OverviewStats />
      </div>
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default IntroductionSection;