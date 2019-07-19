import "../globals.css";
import { FiInbox, FiFilePlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cortado chat app",
  description: "Talk to your LLM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen w-full p-2">
          <aside className="w-48 flex flex-col items-start h-full py-2 mr-2">
            <Button
              variant="ghost"
              className="flex mt-4 gap-2 w-full justify-start"
            >
              <FiInbox className="ml-2 h-4 w-4" />

              <span>Chat history</span>

              <Badge variant="ghost">
                <span className="text-xs text-gray-500 font-semibold">5</span>
              </Badge>
            </Button>
            <Button
              variant="ghost"
              className="flex mt-4 gap-2 w-full justify-start"
            >
              <FiFilePlus className="ml-2 h-4 w-4" />

              <span>New chat</span>
            </Button>
          </aside>
          <div className="border rounded-lg w-full h-full overflow-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
