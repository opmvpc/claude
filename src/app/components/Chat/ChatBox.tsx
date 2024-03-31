"use client";

import { Textarea } from "@nextui-org/react";
import ChatHistory from "./ChatHistory";
import { Message } from "../../../types";
import SendButton from "./SendButton";
import { useChat } from "ai/react";

export default function ChatBox({
  conversationId,
  history,
}: {
  conversationId: string;
  history: Message[];
}) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    id: conversationId,
    initialMessages: history,
    body: {
      conversationId: conversationId,
    },
  });

  return (
    <>
      <ChatHistory messages={messages} />
      <form
        onSubmit={handleSubmit}
        className="flex items-center space-x-4 p-4 bg-zinc-900"
      >
        <Textarea
          label="Your message"
          placeholder="Ask something to Claude"
          className=""
          name="message"
          value={input}
          onChange={handleInputChange}
        />
        <div>
          <SendButton />
        </div>
      </form>
    </>
  );
}
