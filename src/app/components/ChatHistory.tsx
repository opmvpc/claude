import { Message } from "../types";
import { Spinner } from "@nextui-org/react";

export default function ChatHistory({ messages }: { messages: Message[] }) {
  if (!messages) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col">
      <h1>Chat History</h1>
      <ul>
        {messages?.map((message, index) => (
          <li key={`message-${index}`}>
            <div>
              {message.content.map((content, index) => {
                if (content.type === "text") {
                  return <div key={`content-${index}`}>{content.text}</div>;
                }

                return null;
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
