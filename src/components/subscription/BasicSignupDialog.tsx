import SignupDialog from "./SignupDialog";
import { useNavigate } from "react-router-dom";

interface BasicSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BasicSignupDialog = ({ open, onOpenChange }: BasicSignupDialogProps) => {
  const navigate = useNavigate();

  return (
    <SignupDialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) {
          navigate("/signin");
        }
      }}
      tier="basic"
      title="Sign Up for Basic Plan"
      description="Get started with our free tier and explore the basic features"
    />
  );
};

export default BasicSignupDialog;