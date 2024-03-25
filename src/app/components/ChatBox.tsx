"use client";

import { Textarea } from "@nextui-org/react";
import ChatHistory from "./ChatHistory";
import { Message } from "../types";
import { addMessage, createConversation } from "@/app/actions/conversations";
import SendButton from "./SendButton";
import { useOptimistic, useRef, useState } from "react";

export function ChatBox({
  conversationId,
  history,
}: {
  conversationId?: string;
  history?: Message[];
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [messages, setMessages] = useState(history ?? []);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, newMessage) => [
    ...state,
    { id: "0", role: "user", content: [{ type: "text", text: newMessage }] },
  ]);

  return (
    <div className="flex flex-col  h-full">
      <ChatHistory messages={optimisticMessages} />
      <form
        action={async (formData: FormData) => {
          const message = (formData.get("message") ?? "") as string;
          addOptimisticMessage(message);
          if (!conversationId) {
            await createConversation(formData);
            return;
          }
          const addMessageToConversation = addMessage.bind(
            null,
            conversationId
          );
          const sentMessage = await addMessageToConversation(formData);
          setMessages([...messages, sentMessage]);
          const textarea = document.querySelector(
            "textarea[name=message]"
          ) as HTMLTextAreaElement;
          if (textarea) {
            textarea.focus();
          }
          formRef.current?.reset();
        }}
        ref={formRef}
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
