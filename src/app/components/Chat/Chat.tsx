import { Message } from "../../../types";
import { getConversation } from "@/app/actions/conversations";
import ChatBox from "./ChatBox";

export default async function Chat({
  conversationId,
}: {
  conversationId: string;
}) {
  const history: Message[] =
    (await getConversation(conversationId)).messages ?? [];

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col  h-full">
        <ChatBox history={history} conversationId={conversationId} />
      </div>
    </div>
  );
}
