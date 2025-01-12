import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { mainMenuItems } from "./MainMenu";
import { useSubscriptionTier } from "@/hooks/useSubscriptionTier";
import ProfileMenu from "./ProfileMenu";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle } from "lucide-react";

interface TopNavProps {
  user: any;
}

const TopNav = ({ user: initialUser }: TopNavProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const { subscriptionTier, setSubscriptionTier, checkSubscriptionTier } = useSubscriptionTier(initialUser);

  useEffect(() => {
    const handleAuthChange = async (_event: string, session: any) => {
      try {
        if (session?.user) {
          setUser(session.user);
          await checkSubscriptionTier(session.user);
        } else {
          setUser(null);
          setSubscriptionTier(null);
          // If token is invalid, redirect to signin
          if (_event === 'TOKEN_REFRESHED' || _event === 'SIGNED_OUT') {
            navigate('/signin');
            toast.error("Session expired. Please sign in again.");
          }
        }
      } catch (error: any) {
        console.error("Auth error:", error);
        if (error.message?.includes('refresh_token_not_found')) {
          navigate('/signin');
          toast.error("Session expired. Please sign in again.");
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, checkSubscriptionTier, setSubscriptionTier]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setSubscriptionTier(null);
      toast.success("Signed out successfully");
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  const handleUpgrade = () => {
    navigate("/subscription");
  };

  const showUpgradeButton = user && subscriptionTier && subscriptionTier !== 'advanced';

  return (
    <header className="w-full bg-black border-b border-crypto-gray">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/fc6224c9-4be9-4d1a-b5ad-3da64a81c6e0.png" 
              alt="Mericulum Logo" 
              className="h-12 w-auto"
            />
          </div>

          {/* Main Menu */}
          <nav className="hidden md:flex ml-8 flex-1">
            <div className="flex items-center space-x-8">
              {mainMenuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="flex items-center gap-2 text-gray-300 hover:text-crypto-blue transition-colors group"
                >
                  <item.icon size={18} className="group-hover:text-crypto-blue transition-colors" />
                  <span className="font-medium uppercase tracking-wider text-sm">{item.label}</span>
                </a>
              ))}
            </div>
          </nav>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            {showUpgradeButton && (
              <Button
                onClick={handleUpgrade}
                className="bg-crypto-blue hover:bg-crypto-blue/90 text-white flex items-center gap-2"
              >
                <ArrowUpCircle className="h-4 w-4" />
                Upgrade Tier
              </Button>
            )}
            <ProfileMenu 
              user={user} 
              subscriptionTier={subscriptionTier}
              onSignOut={handleSignOut}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;