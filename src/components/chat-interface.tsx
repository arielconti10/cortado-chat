"use client";
import React, { useState, useEffect } from "react";
import { Message, continueConversation } from "@/app/actions";
import { readStreamableValue } from "ai/rsc";
import ChatHistory from "@/components/chat-history";
import ChatInput from "@/components/chat-input";
import Sidebar from "@/components/sidebar";

type ChatSummary = {
  id: string;
  title: string;
  preview: string;
  date: string;
};

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [allChats, setAllChats] = useState<ChatSummary[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  useEffect(() => {
    const storedChats = localStorage.getItem("allChats");
    const storedCurrentChatId = localStorage.getItem("currentChatId");

    if (storedChats) {
      const parsedChats = JSON.parse(storedChats);
      setAllChats(parsedChats);

      if (storedCurrentChatId) {
        setCurrentChatId(storedCurrentChatId);
        const currentChat = parsedChats.find(
          (chat: ChatSummary) => chat.id === storedCurrentChatId
        );
        if (currentChat) {
          const storedMessages = localStorage.getItem(
            `messages_${storedCurrentChatId}`
          );
          if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("allChats", JSON.stringify(allChats));
  }, [allChats]);

  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem("currentChatId", currentChatId);
      localStorage.setItem(
        `messages_${currentChatId}`,
        JSON.stringify(messages)
      );
    }
  }, [currentChatId, messages]);

  function generateChatSummary(
    chatId: string,
    messages: Message[]
  ): ChatSummary {
    const lastMessage = messages[messages.length - 1];
    return {
      id: chatId,
      title: `Chat ${allChats.length + 1}`,
      preview: lastMessage.content.substring(0, 30) + "...",
      date: new Date().toLocaleDateString(),
    };
  }

  // Function to update or add a chat summary
  function updateChatSummary(chatId: string, messages: Message[]) {
    const summary = generateChatSummary(chatId, messages);
    setAllChats((prevChats) => {
      const existingChatIndex = prevChats.findIndex(
        (chat) => chat.id === chatId
      );
      if (existingChatIndex !== -1) {
        // Update existing chat
        const updatedChats = [...prevChats];
        updatedChats[existingChatIndex] = summary;
        return updatedChats;
      } else {
        // Add new chat
        return [...prevChats, summary];
      }
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    const chatId = currentChatId || Date.now().toString();
    if (!currentChatId) {
      setCurrentChatId(chatId);
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);
    setInput("");

    try {
      const { messages: updatedMessages, newMessage } =
        await continueConversation(currentMessages);

      const assistantMessageId = Date.now().toString();
      let assistantResponse = "";

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: assistantMessageId,
          role: "assistant",
          content: assistantResponse,
        } as Message,
      ]);

      for await (const chunk of readStreamableValue(newMessage)) {
        assistantResponse += chunk;
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: assistantResponse }
              : msg
          )
        );
      }

      // Update chat summary after assistant's response
      const finalMessages: Message[] = [
        ...updatedMessages,
        {
          id: assistantMessageId,
          role: "assistant",
          content: assistantResponse,
        } as Message,
      ];
      updateChatSummary(chatId, finalMessages);
      setMessages(finalMessages);
    } catch (err) {
      setError(
        "An error occurred while sending your message. Please try again."
      );
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full bg-white">
      <Sidebar chats={allChats} />
      <div className="flex flex-col flex-grow">
        <header className="flex justify-between items-center p-4 border-b">
          <span className="text-xs text-gray-400">
            This is the beginning of your chat history with the LLM.
          </span>
        </header>
        <div className="flex-grow overflow-y-auto">
          <ChatHistory messages={messages} />
        </div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default ChatInterface;
