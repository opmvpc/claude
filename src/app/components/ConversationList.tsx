"use client";

import Link from "next/link";
import NewConversationButton from "./newConversationButton";
import { Conversation } from "../types";
import DeleteConversationButton from "./DeleteConversationButton";

export default async function ConversationList({
  conversations,
  currentConversationId,
}: {
  conversations: Conversation[];
  currentConversationId?: string;
}) {
  return (
    <div className="p-4 flex-grow">
      <div className="flex justify-between items-center space-x-2">
        <Link href={"/conversations"} className="text-3xl font-bold">
          Claude
        </Link>
        <NewConversationButton />
      </div>
      <ul className="space-y-2 py-6">
        {conversations.map((conversation: Conversation) => (
          <li key={conversation.id}>
            <div className="flex space-x-2">
              <Link
                className={
                  "truncate " +
                  (conversation.id === currentConversationId ? "font-bold" : "")
                }
                href={"/conversations/" + conversation.id}
              >
                {conversation.name}
              </Link>
              <DeleteConversationButton conversationId={conversation.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
