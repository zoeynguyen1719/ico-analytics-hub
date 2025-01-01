import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Bot, Send } from "lucide-react";
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

      console.log('Sending message to chat function:', message);
      const response = await supabase.functions.invoke('chat', {
        body: { message },
      });

      console.log('Received response from chat function:', response);

      if (response.error) {
        console.error('Supabase function error:', response.error);
        
        // Check if the error is related to quota
        const errorMessage = response.error.message || 'Failed to get response from AI';
        if (errorMessage.includes('quota exceeded')) {
          toast({
            title: "Service Temporarily Unavailable",
            description: "Our AI service is currently at capacity. Please try again later or contact support.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        }
        
        // Remove the user's message if we couldn't get a response
        setConversation(prev => prev.slice(0, -1));
        return;
      }

      if (!response.data) {
        throw new Error('No response data received');
      }

      setConversation(prev => [...prev, { role: "assistant", content: response.data.generatedText }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to connect to AI service. Please try again later.",
        variant: "destructive",
      });
      
      // Remove the user's message if we couldn't get a response
      setConversation(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-crypto-blue hover:bg-crypto-green shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          <MessageCircle className="h-7 w-7 text-white" />
        </Button>
      ) : (
        <div className="bg-crypto-dark border border-crypto-gray rounded-2xl shadow-2xl w-[380px] max-h-[600px] flex flex-col transform transition-all duration-200">
          <div className="p-4 border-b border-crypto-gray bg-gradient-to-r from-crypto-dark to-crypto-gray rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bot className="h-6 w-6 text-crypto-blue animate-pulse" />
              <h3 className="text-crypto-blue font-semibold text-lg">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-crypto-gray rounded-full"
            >
              <X className="h-5 w-5 text-crypto-blue" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-crypto-gray scrollbar-track-transparent">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in-50 duration-200`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-crypto-blue to-crypto-green text-white ml-4"
                      : "bg-crypto-gray text-white mr-4"
                  } shadow-md`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-crypto-gray bg-gradient-to-r from-crypto-dark to-crypto-gray rounded-b-2xl">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
        </div>
      )}
    </div>
  );
};

export default AIChatBox;