import BasicSignupDialog from "./BasicSignupDialog";
import PremiumSignupDialog from "./PremiumSignupDialog";
import AdvancedSignupDialog from "./AdvancedSignupDialog";

interface SubscriptionDialogsProps {
  showBasicSignupDialog: boolean;
  showPremiumSignupDialog: boolean;
  showAdvancedSignupDialog: boolean;
  setShowBasicSignupDialog: (show: boolean) => void;
  setShowPremiumSignupDialog: (show: boolean) => void;
  setShowAdvancedSignupDialog: (show: boolean) => void;
  handleStripeCheckout: (userId: string) => Promise<void>;
}

const SubscriptionDialogs = ({
  showBasicSignupDialog,
  showPremiumSignupDialog,
  showAdvancedSignupDialog,
  setShowBasicSignupDialog,
  setShowPremiumSignupDialog,
  setShowAdvancedSignupDialog,
  handleStripeCheckout,
}: SubscriptionDialogsProps) => {
  return (
    <>
      <BasicSignupDialog
        open={showBasicSignupDialog}
        onOpenChange={setShowBasicSignupDialog}
      />
      
      <PremiumSignupDialog
        open={showPremiumSignupDialog}
        onOpenChange={setShowPremiumSignupDialog}
        onSuccess={handleStripeCheckout}
      />
      
      <AdvancedSignupDialog
        open={showAdvancedSignupDialog}
        onOpenChange={setShowAdvancedSignupDialog}
        onSuccess={handleStripeCheckout}
      />
    </>
  );
};

export default SubscriptionDialogs;