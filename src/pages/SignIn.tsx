import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, check if the user exists
      const { data: userExists } = await supabase
        .from('basic_signups')
        .select('email')
        .eq('email', email)
        .single();

      if (!userExists) {
        toast.error("No account found with this email. Please sign up first.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          toast.error("Please confirm your email before signing in. Check your inbox for the confirmation link.");
        } else if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid password. Please try again.");
        } else {
          toast.error(error.message);
        }
        console.error("Sign in error:", error);
      } else {
        toast.success("Successfully signed in!");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 bg-crypto-dark border-crypto-gray">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-crypto-blue">Sign In to Mericulum</h1>
          <p className="text-gray-400">Welcome back!</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
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
              disabled={loading}
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
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;