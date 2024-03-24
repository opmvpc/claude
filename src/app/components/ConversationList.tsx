import Link from "next/link";
import { getConversations } from "../actions/conversations";
import NewConversationButton from "./newConversationButton";
import { Conversation } from "../types";

export default async function ConversationList() {
  const conversations = await getConversations();

  return (
    <div className="p-4 flex-grow">
      <div className="flex justify-between items-center space-x-2">
        <div className="text-3xl font-bold">Claude</div>
        <NewConversationButton />
      </div>
      <ul className="space-y-2 py-6">
        {conversations.map((conversation: Conversation) => (
          <li key={conversation.id}>
            <div className="flex space-x-2">
              <Link
                className="truncate "
                href={"/conversations/" + conversation.id}
              >
                {conversation.name}
              </Link>
              <div>
                <i className="ri-delete-bin-6-line text-zinc-600 text-xl"></i>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
