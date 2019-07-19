import React from "react";
import Link from "next/link";
import { PiPlus as PlusIcon } from "react-icons/pi";
import { Button } from "@/components/ui/button";

type ChatSummary = {
  id: string;
  title: string;
  preview: string;
  date: string;
};

interface SidebarProps {
  chats: ChatSummary[];
}

function Sidebar({ chats }: SidebarProps) {
  return (
    <div className="flex flex-col border-r">
      <Button variant="ghost" className="flex p-4 w-64">
        <PlusIcon className="h-5 w-5 mr-2" />
        New Chat
      </Button>
      <div className="flex-grow overflow-y-auto">
        {chats.length > 0 ? (
          chats.map((chat) => <ChatSummary key={chat.id} chat={chat} />)
        ) : (
          <p className="p-4">No chats available</p>
        )}
      </div>
    </div>
  );
}

function ChatSummary({ chat }: { chat: ChatSummary }) {
  return (
    <Link href={`/chat/${chat.id}`} className="block  p-4">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-sm font-semibold">
          {chat.title.charAt(0)}
        </div>
        <div className="flex-grow">
          <h3 className="text-sm font-semibold">{chat.title}</h3>
          <p className="text-xs truncate">{chat.preview}</p>
        </div>
        <span className="text-xs">{chat.date}</span>
      </div>
    </Link>
  );
}

export default Sidebar;
