import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Database, List, Info } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import BasicSignupDialog from "@/components/subscription/BasicSignupDialog";
import { useState } from "react";

const BasicTier = () => {
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  const features = [
    {
      icon: Database,
      title: "ICO Analytics Dashboard",
      description: "Access to our basic ICO analytics dashboard with essential metrics"
    },
    {
      icon: List,
      title: "Project Listings",
      description: "View active and upcoming ICO projects"
    },
    {
      icon: Shield,
      title: "Basic Portfolio Tools",
      description: "Essential tools for tracking your investments"
    },
    {
      icon: Info,
      title: "Market Updates",
      description: "Access to fundamental market information and updates"
    }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-crypto-blue mb-4">Basic Tier Features</h1>
            <p className="text-xl text-gray-300">
              Start your crypto journey with our essential features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 bg-crypto-gray border-crypto-blue hover:border-crypto-green transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-crypto-dark rounded-lg">
                    <feature.icon className="h-6 w-6 text-crypto-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-6">
            <Card className="p-8 bg-crypto-gray border-crypto-blue">
              <h2 className="text-2xl font-bold text-crypto-blue mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-300 mb-6">
                Join our community of crypto enthusiasts and start exploring ICO opportunities
              </p>
              <Button 
                size="lg"
                onClick={() => setShowSignupDialog(true)}
                className="bg-crypto-green hover:bg-crypto-green/90 text-crypto-dark"
              >
                Sign Up for Basic Tier
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <BasicSignupDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
      />
    </DashboardLayout>
  );
};

export default BasicTier;