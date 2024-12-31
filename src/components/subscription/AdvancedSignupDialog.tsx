import SignupDialog from "./SignupDialog";

interface AdvancedSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (userId: string) => void;
}

const AdvancedSignupDialog = ({ open, onOpenChange, onSuccess }: AdvancedSignupDialogProps) => {
  return (
    <SignupDialog
      open={open}
      onOpenChange={onOpenChange}
      onSuccess={onSuccess}
      tier="advanced"
      title="Sign Up for Advanced Plan"
      description="Create your account to access advanced features"
    />
  );
};

export default AdvancedSignupDialog;