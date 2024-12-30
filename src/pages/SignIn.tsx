import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Successfully signed in!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "Error signing in");
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
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-white">Password</Label>
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