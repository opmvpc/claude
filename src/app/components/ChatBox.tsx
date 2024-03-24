import { Textarea } from "@nextui-org/react";
import ChatHistory from "./ChatHistory";
import { Conversation } from "../types";
import { addMessage, getConversation } from "@/app/actions/conversations";
import SendButton from "./SendButton";

export async function ChatBox({ conversationId }: { conversationId: string }) {
  const conversation = (await getConversation(conversationId)) as Conversation;
  const addMessageToConversation = addMessage.bind(null, conversationId);
  console.log(conversation);

  return (
    <div className="flex flex-col  h-full">
      <ChatHistory conversation={conversation} />
      <form
        action={addMessageToConversation}
        className="flex items-center space-x-4 p-4 bg-zinc-900"
      >
        <Textarea
          label="Your message"
          placeholder="Ask something to Claude"
          className=""
          name="message"
        />
        <div>
          <SendButton />
        </div>
      </form>
    </div>
  );
}
