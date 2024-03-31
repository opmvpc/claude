"use client";

import { Message } from "../../types";
import { Spinner, User } from "@nextui-org/react";
import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";
import { Fragment, Suspense, useEffect, useRef } from "react";
import markdownit from "markdown-it";

export default function ChatHistory({ messages }: { messages: Message[] }) {
  const historyDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyDiv.current) {
      historyDiv.current.scrollTop = historyDiv.current.scrollHeight;
    }
  }, [messages]);

  const md = markdownit();

  return (
    <div
      ref={historyDiv}
      className="flex-grow flex flex-col px-4 py-4 overflow-y-auto"
    >
      <ul className="flex flex-col space-y-8">
        {messages?.map((message, index) => (
          <Fragment key={`message-${index}`}>
            {message.role === "assistant" ? (
              <Suspense fallback={<div>Loading...</div>}>
                <AssistantMessage message={md.render(message.content) ?? ""} />
              </Suspense>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <UserMessage message={md.render(message.content) ?? ""} />
              </Suspense>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
