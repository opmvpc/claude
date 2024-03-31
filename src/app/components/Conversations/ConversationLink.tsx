"use server";
import Link from "next/link";

export default async function ConversationLink({
  conversation,
  currentConversationId,
}: {
  conversation: { id: string; name: string };
  currentConversationId: string;
}) {
  return (
    <Link
      className={
        "truncate " +
        (conversation.id === currentConversationId ? "font-bold" : "")
      }
      href={"/conversations/" + conversation.id}
    >
      {conversation.name}
    </Link>
  );
}
