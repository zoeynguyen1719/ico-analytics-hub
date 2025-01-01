import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatButtonProps {
  onClick: () => void;
}

export const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-full w-14 h-14 bg-crypto-blue hover:bg-crypto-green shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
};