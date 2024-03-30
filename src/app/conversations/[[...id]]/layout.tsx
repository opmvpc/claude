import type { Metadata } from "next";
import ConversationList from "../../components/Conversations/ConversationList";
import UserCard from "../../components/User/UserCard";
import { getConversations } from "../../actions/conversations";

export const metadata: Metadata = {
  title: "Claude chat",
  description: "Chat with Claude",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id?: string[] };
}) {
  const conversations = await getConversations();
  const currentConversationId = params.id ? params.id.join("") : undefined;

  return (
    <main className=" h-screen flex ">
      <div className="w-52 bg-zinc-950 flex flex-col">
        <ConversationList
          conversations={conversations}
          currentConversationId={currentConversationId}
        />
        <UserCard />
      </div>

      <div className="w-full">{children}</div>
    </main>
  );
}
