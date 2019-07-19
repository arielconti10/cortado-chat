import { Message } from "ai";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PiOpenAiLogo } from "react-icons/pi";
import ShineBorder from "@/components/magicui/shine-border";

function MessageComponent({ role, content }: Message) {
  const isAssistant = role === "assistant";

  const MessageContent = () => (
    <div className="flex items-start space-x-3 w-full">
      <Avatar className="w-8 h-8">
        {isAssistant ? (
          <PiOpenAiLogo className="w-6 h-6" />
        ) : (
          <AvatarFallback>U</AvatarFallback>
        )}
      </Avatar>
      <div className="flex-grow">
        <p className="text-sm font-semibold mb-1">
          {isAssistant ? "Assistant" : "User"}{" "}
          <span className="text-xs text-gray-500 ml-2">timestamp</span>
        </p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {isAssistant ? (
        <ShineBorder
          borderRadius={8}
          borderWidth={1}
          duration={10}
          color={["#3b82f6", "#10b981"]}
          className="w-full"
        >
          <MessageContent />
        </ShineBorder>
      ) : (
        <div className="border p-2 rounded-md border-neutral-200 ">
          <MessageContent />
        </div>
      )}
    </div>
  );
}

export default MessageComponent;
