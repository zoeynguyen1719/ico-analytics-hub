import { UserCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProfileMenuProps {
  user: any;
  subscriptionTier: string | null;
  onSignOut: () => void;
}

const ProfileMenu = ({ user, subscriptionTier, onSignOut }: ProfileMenuProps) => {
  if (!user) return null;

  return (
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
            onClick={onSignOut}
            className="block w-full px-4 py-2 text-sm text-gray-300 hover:bg-crypto-gray hover:text-white transition-colors text-left"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;