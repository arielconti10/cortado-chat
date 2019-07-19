import { Message } from "ai";
import MessageComponent from "@/components/message";

function ChatHistory({ messages }: { messages: Message[] }) {
  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-180px)] overflow-y-auto">
      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <MessageComponent key={index} {...message} />
        ))}
      </div>
    </div>
  );
}

export default ChatHistory;
