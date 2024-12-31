import SignupDialog from "./SignupDialog";

interface PremiumSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (userId: string) => void;
}

const PremiumSignupDialog = ({ open, onOpenChange, onSuccess }: PremiumSignupDialogProps) => {
  return (
    <SignupDialog
      open={open}
      onOpenChange={onOpenChange}
      onSuccess={onSuccess}
      tier="premium"
      title="Sign Up for Premium Plan"
      description="Create your account to access premium features"
    />
  );
};

export default PremiumSignupDialog;