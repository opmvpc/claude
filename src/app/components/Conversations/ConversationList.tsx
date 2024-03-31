import Link from "next/link";
import { Conversation } from "../../../types";
import DeleteConversationButton from "./DeleteConversationButton";
import { getConversations } from "@/app/actions/conversations";
import ConversationLink from "./ConversationLink";
import { Suspense } from "react";

export default async function ConversationList({
  currentConversationId,
}: {
  currentConversationId: string;
}) {
  const conversations = await getConversations();

  return (
    <ul className="space-y-2 py-6">
      {conversations.map((conversation: Conversation) => (
        <li key={conversation.id}>
          <div className="flex space-x-2">
            <Suspense fallback={<div>Loading...</div>}>
              <ConversationLink
                conversation={conversation}
                currentConversationId={currentConversationId}
              />
              <DeleteConversationButton conversationId={conversation.id} />
            </Suspense>
          </div>
        </li>
      ))}
    </ul>
  );
}
