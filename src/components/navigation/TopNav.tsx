import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TopNavProps {
  user: any;
}

const TopNav = ({ user }: TopNavProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
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
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/fc6224c9-4be9-4d1a-b5ad-3da64a81c6e0.png" 
              alt="Mericulum Logo" 
              className="h-12 w-auto"
            />
          </div>

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