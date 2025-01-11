import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { mainMenuItems } from "./MainMenu";

interface TopNavProps {
  user: any;
}

const TopNav = ({ user: initialUser }: TopNavProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUser);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);

  const checkSubscriptionTier = async (user: any) => {
    if (!user) return;
    
    // Check for subscription
    const { data: subData } = await supabase
      .from('subscriptions')
      .select('tier')
      .eq('user_id', user.id)
      .maybeSingle();

    if (subData) {
      setSubscriptionTier(subData.tier);
    } else {
      // Check basic_signups if no subscription found
      const { data: basicData } = await supabase
        .from('basic_signups')
        .select('email')
        .eq('email', user.email)
        .maybeSingle();

      if (basicData) {
        setSubscriptionTier('basic');
      }
    }
  };

  useEffect(() => {
    // Check subscription tier on mount if user exists
    if (initialUser?.user) {
      checkSubscriptionTier(initialUser.user);
    }

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
  }, [initialUser]);

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
            {user && (
              <div className="relative group">
                <Avatar className="h-10 w-10 cursor-pointer bg-crypto-blue hover:bg-crypto-blue/80 transition-colors">
                  <AvatarFallback className="bg-crypto-blue text-white">
                    <UserCircle className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-crypto-dark border border-crypto-gray opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {subscriptionTier && (
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-crypto-gray">
                        <span className="text-crypto-blue font-semibold uppercase">{subscriptionTier}</span> Tier
                      </div>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-crypto-gray hover:text-white transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;