import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, check if the user exists in subscriptions or basic_signups
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('tier')
        .eq('email', email.trim())
        .maybeSingle();

      const { data: basicSignup } = await supabase
        .from('basic_signups')
        .select('email')
        .eq('email', email.trim())
        .maybeSingle();

      if (!subscription && !basicSignup) {
        toast.error("No account found with this email. Please sign up first.");
        setLoading(false);
        return;
      }

      // If we get here, the user exists, so try to sign them in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          toast.error("Invalid password. Please try again.");
        } else {
          toast.error(signInError.message);
        }
        console.error("Sign in error:", signInError);
      } else {
        toast.success("Successfully signed in!");
        navigate("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);
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
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-crypto-blue hover:bg-crypto-blue/90"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <Button
            type="button"
            onClick={handleReturnHome}
            variant="outline"
            className="w-full mt-4 border-crypto-blue text-crypto-blue hover:bg-crypto-blue/10"
          >
            Return to Homepage
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;