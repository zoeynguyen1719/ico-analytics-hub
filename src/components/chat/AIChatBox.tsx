import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatButton } from "./ChatButton";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";

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
      
      setConversation(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <ChatButton onClick={() => setIsOpen(true)} />
      ) : (
        <div className="bg-crypto-dark border border-crypto-gray rounded-2xl shadow-2xl w-[380px] max-h-[600px] flex flex-col transform transition-all duration-200">
          <ChatHeader onClose={() => setIsOpen(false)} />
          <MessageList messages={conversation} />
          <ChatInput
            message={message}
            loading={loading}
            onMessageChange={(e) => setMessage(e.target.value)}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default AIChatBox;