import DashboardLayout from "@/components/DashboardLayout";

const About = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="text-gray-300 mb-4">
          Welcome to our ICO Analytics Platform. We provide comprehensive tools and insights for cryptocurrency investors.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default About;