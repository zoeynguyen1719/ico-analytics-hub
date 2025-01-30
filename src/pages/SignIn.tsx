import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type BasicSignup = Database['public']['Tables']['basic_signups']['Row'];

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { redirectTo, tier } = location.state || {};

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Attempting to sign in with email:", email);
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        console.error("Sign in error details:", {
          message: signInError.message,
          status: signInError.status,
          name: signInError.name
        });
        
        if (signInError.message.includes('Invalid login credentials')) {
          toast.error("The email and password combination is incorrect. Please check your credentials and try again.");
        } else if (signInError.message.includes('Email not confirmed')) {
          toast.error("Please confirm your email address before signing in.");
        } else {
          toast.error("An error occurred while signing in. Please try again.");
        }
        setLoading(false);
        return;
      }

      if (!signInData.user) {
        console.error("No user data returned after successful sign in");
        toast.error("Unable to complete sign in. Please try again.");
        setLoading(false);
        return;
      }

      // Check and update basic_signups if needed
      const { data: basicSignup, error: basicSignupError } = await supabase
        .from('basic_signups')
        .select('email, user_id')
        .eq('email', email.trim())
        .maybeSingle();

      if (basicSignupError) {
        console.error("Error checking basic signup:", basicSignupError);
        // Don't block the sign-in process for this error
      }

      // Update the basic_signups table with the user_id if it's not set
      if (basicSignup && !basicSignup.user_id) {
        const { error: updateError } = await supabase
          .from('basic_signups')
          .update({ user_id: signInData.user.id })
          .eq('email', email.trim());

        if (updateError) {
          console.error("Error updating basic signup:", updateError);
          // Don't block the sign-in process for this error
        }
      }

      toast.success("Successfully signed in!");
      
      // If this was a premium subscription signup flow, redirect to Stripe
      if (redirectTo === "/subscription" && tier === "premium") {
        window.location.href = "https://buy.stripe.com/5kA8wH0ZO5c7dnG8ww";
        return;
      }
      
      // Otherwise redirect to the specified page or home
      navigate(redirectTo || "/");

    } catch (error) {
      console.error("Unexpected sign in error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-crypto-dark border-crypto-gray">
        <div className="text-center mb-8">
          <img
            src="/lovable-uploads/fc6224c9-4be9-4d1a-b5ad-3da64a81c6e0.png"
            alt="Mericulum Logo"
            className="h-12 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-crypto-gray text-white border-crypto-blue focus:border-crypto-green"
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-crypto-gray text-white border-crypto-blue focus:border-crypto-green"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-crypto-blue hover:bg-crypto-blue/90"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>

          <Button
            type="button"
            onClick={handleReturnHome}
            variant="outline"
            className="w-full mt-4 border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10"
            disabled={loading}
          >
            Return to Homepage
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;