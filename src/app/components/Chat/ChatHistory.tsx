import { Message } from "../../types";
import { Spinner, User } from "@nextui-org/react";
import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";
import { Fragment, useEffect, useRef } from "react";
import markdownit from "markdown-it";

export default function ChatHistory({ messages }: { messages: Message[] }) {
  if (!messages) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

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
      className="flex-grow flex flex-col px-3 py-3 overflow-y-auto"
    >
      <h1>Chat History</h1>
      <ul className="flex flex-col space-y-8">
        {messages?.map((message, index) => (
          <Fragment key={`message-${index}`}>
            {message.role === "assistant" ? (
              <AssistantMessage message={md.render(message.content)} />
            ) : (
              <UserMessage message={md.render(message.content)} />
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
