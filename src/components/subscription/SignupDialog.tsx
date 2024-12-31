import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            subscription_tier: tier
          },
          emailRedirectTo: tier === 'basic' ? `${window.location.origin}/signin` : undefined
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        toast.error(authError.message);
        return;
      }

      if (!authData.user) {
        console.error('No user data returned');
        toast.error("Failed to create user account");
        return;
      }

      if (tier === 'basic') {
        if (authData.session) {
          const { error: signupError } = await supabase
            .from('basic_signups')
            .insert([{ 
              email,
              user_id: authData.user.id
            }]);

          if (signupError) {
            console.error('Signup error:', signupError);
            toast.error("Error saving signup information");
            return;
          }

          toast.success("Welcome to Mericulum! Your account has been created.");
        } else {
          toast.success("Please check your email to confirm your account. You will be able to sign in after confirmation.");
        }
      } else {
        toast.success("Account created successfully!");
        onSuccess?.(authData.user.id);
      }

      onOpenChange(false);
    } catch (error: any) {
      console.error('Unexpected error:', error);
      toast.error(error.message || "Error during signup. Please try again.");
    } finally {
      setLoading(false);
    }
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
        <form onSubmit={handleSignup} className="space-y-4">
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
          <div className="relative">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-crypto-gray text-white border-crypto-blue focus:border-crypto-green pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
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

export default SignupDialog;