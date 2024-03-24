import type { Metadata } from "next";
import ConversationList from "../components/ConversationList";
import UserCard from "../components/UserCard";

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
    <main className=" min-h-screen flex ">
      <div className="w-52 bg-zinc-950 flex flex-col">
        <ConversationList />
        <UserCard />
      </div>

      <div className="w-full">{children}</div>
    </main>
  );
}
