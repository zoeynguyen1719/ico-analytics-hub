interface Message {
  role: string;
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-crypto-gray scrollbar-track-transparent">
      {messages.map((msg, index) => (
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
  );
};