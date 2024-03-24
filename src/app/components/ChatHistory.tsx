import { Conversation } from "../types";
import { Spinner } from "@nextui-org/react";

export default function ChatHistory({
  conversation,
}: {
  conversation: Conversation;
}) {
  if (!conversation) {
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
        {conversation.messages?.map((message) => (
          <li key={message.id}>
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
