import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import { Providers } from "./providers";
import ConversationList from "./components/Conversations/ConversationList";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Claude chat",
  description: "Chat with Claude",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
