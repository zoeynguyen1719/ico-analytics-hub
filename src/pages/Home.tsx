import DashboardLayout from "@/components/DashboardLayout";
import HeroSection from "@/components/introduction/HeroSection";
import FeaturesSection from "@/components/introduction/FeaturesSection";
import CTASection from "@/components/introduction/CTASection";

const Home = () => {
  return (
    <DashboardLayout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </DashboardLayout>
  );
};

export default Home;