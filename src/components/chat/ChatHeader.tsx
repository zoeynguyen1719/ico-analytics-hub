import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => {
  return (
    <div className="p-4 border-b border-crypto-gray bg-gradient-to-r from-crypto-dark to-crypto-gray rounded-t-2xl flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Bot className="h-6 w-6 text-crypto-blue animate-pulse" />
        <h3 className="text-crypto-blue font-semibold text-lg">AI Assistant</h3>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="hover:bg-crypto-gray rounded-full"
      >
        <X className="h-5 w-5 text-crypto-blue" />
      </Button>
    </div>
  );
};