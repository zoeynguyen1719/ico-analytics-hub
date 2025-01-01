import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Bot } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AIChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setLoading(true);
      const userMessage = { role: "user", content: message };
      setConversation(prev => [...prev, userMessage]);
      setMessage("");

      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message },
      });

      if (error) throw error;

      setConversation(prev => [...prev, { role: "assistant", content: data.generatedText }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-crypto-blue hover:bg-crypto-green shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-crypto-dark border border-crypto-gray rounded-lg shadow-xl w-[350px] max-h-[500px] flex flex-col">
          <div className="p-4 border-b border-crypto-gray flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-crypto-blue" />
              <h3 className="text-crypto-blue font-semibold">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-crypto-gray"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-crypto-blue text-black ml-4"
                      : "bg-crypto-gray text-white mr-4"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-crypto-gray">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-crypto-gray text-white placeholder:text-gray-400"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !message.trim()}>
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatBox;