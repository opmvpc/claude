import type { Metadata } from "next";
import ConversationList from "../../components/Conversations/ConversationList";
import UserCard from "../../components/User/UserCard";
import { Suspense } from "react";
import Link from "next/link";
import NewConversationButton from "@/app/components/Conversations/newConversationButton";

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
  const currentConversationId = params.id ? params.id.join("") : undefined;

  return (
    <main className=" h-screen flex ">
      <div className="w-52 bg-zinc-950 flex flex-col">
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-center space-x-2">
            <Link href={"/conversations"} className="text-3xl font-bold">
              Claude
            </Link>
            <NewConversationButton />
          </div>
          <ConversationList currentConversationId={currentConversationId} />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <UserCard />
        </Suspense>
      </div>

      <div className="w-full">{children}</div>
    </main>
  );
}
