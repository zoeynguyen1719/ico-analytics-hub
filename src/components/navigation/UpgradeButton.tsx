import { Button } from "@/components/ui/button";
import { ArrowUpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeButtonProps {
  show: boolean;
}

const UpgradeButton = ({ show }: UpgradeButtonProps) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <Button
      onClick={() => navigate("/subscription")}
      className="bg-crypto-blue hover:bg-crypto-blue/90 text-white flex items-center gap-2"
    >
      <ArrowUpCircle className="h-4 w-4" />
      Upgrade Tier
    </Button>
  );
};

export default UpgradeButton;