import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { mainMenuItems } from "./MainMenu";
import { useSubscriptionTier } from "@/hooks/useSubscriptionTier";
import ProfileMenu from "./ProfileMenu";

interface TopNavProps {
  user: any;
}

const TopNav = ({ user: initialUser }: TopNavProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const { subscriptionTier, setSubscriptionTier, checkSubscriptionTier } = useSubscriptionTier(initialUser);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        await checkSubscriptionTier(session.user);
      } else {
        setSubscriptionTier(null);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [initialUser, checkSubscriptionTier, setSubscriptionTier]);

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