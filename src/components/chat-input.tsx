import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { ChangeEvent, FormEvent } from "react";
import { FiArrowUp } from "react-icons/fi";

interface ChatInputProps {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
}: ChatInputProps) {
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex items-center bg-white rounded-lg drop-shadow-2xl p-2">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          disabled={isLoading}
          rows={1}
          className="border-none border-transparent focus-visible:outline-none active:outline-none resize-none active"
        />
        <Button
          variant="default"
          type="submit"
          className={`p-2 bg-blue-500 rounded-full `}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : <FiArrowUp className="h-5 w-5 " />}
        </Button>
      </div>
    </form>
  );
}

export default ChatInput;
