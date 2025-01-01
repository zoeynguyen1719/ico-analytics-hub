import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  message: string;
  loading: boolean;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ChatInput = ({ message, loading, onMessageChange, onSubmit }: ChatInputProps) => {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-crypto-gray bg-gradient-to-r from-crypto-dark to-crypto-gray rounded-b-2xl">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={onMessageChange}
          placeholder="Type your message..."
          className="flex-1 bg-crypto-gray text-white placeholder:text-gray-400 rounded-xl border-crypto-blue focus:border-crypto-green transition-colors"
          disabled={loading}
        />
        <Button 
          type="submit" 
          disabled={loading || !message.trim()}
          className="bg-crypto-blue hover:bg-crypto-green text-white rounded-xl px-4 flex items-center gap-2 transition-colors"
        >
          {loading ? (
            "Sending..."
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send
            </>
          )}
        </Button>
      </div>
    </form>
  );
};