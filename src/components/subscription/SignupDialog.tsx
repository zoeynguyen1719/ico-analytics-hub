import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/useSignup";
import { SignupFormFields } from "./SignupFormFields";

interface SignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (userId: string) => void;
  tier: 'basic' | 'premium' | 'advanced';
  title: string;
  description: string;
}

const SignupDialog = ({ 
  open, 
  onOpenChange, 
  onSuccess, 
  tier, 
  title, 
  description 
}: SignupDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { loading, handleSignup } = useSignup({
    onSuccess,
    onOpenChange,
    tier
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignup(email, password);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-crypto-dark border-crypto-gray">
        <DialogHeader>
          <DialogTitle className="text-2xl text-crypto-blue">{title}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <SignupFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;