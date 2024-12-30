import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BasicSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BasicSignupDialog = ({ open, onOpenChange }: BasicSignupDialogProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBasicSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // First create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: Math.random().toString(36).slice(-8), // Generate a random password
        options: {
          data: {
            subscription_tier: 'basic'
          }
        }
      });

      if (authError) throw authError;

      // Then store the signup information
      const { error: signupError } = await supabase
        .from('basic_signups')
        .insert([
          { 
            email,
            user_id: authData.user?.id
          }
        ]);

      if (signupError) throw signupError;

      toast.success("Welcome to Mericulum! Check your email to complete signup.");
      onOpenChange(false);
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Error during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-crypto-dark border-crypto-gray">
        <DialogHeader>
          <DialogTitle className="text-2xl text-crypto-blue">Sign Up for Basic Plan</DialogTitle>
          <DialogDescription className="text-gray-300">
            Get started with our free tier and explore the basic features
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleBasicSignup} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-crypto-gray text-white border-crypto-blue focus:border-crypto-green"
              placeholder="Enter your email"
              required
            />
          </div>
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

export default BasicSignupDialog;