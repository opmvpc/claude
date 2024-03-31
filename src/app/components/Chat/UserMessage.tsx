import { Message } from "@/types";
import MarkdownIt from "markdown-it";

export default function AssistantMessage({
  message,
  md,
}: {
  message: Message;
  md: MarkdownIt;
}) {
  function setHtml() {
    const txt = md.render(message.content);
    return { __html: txt ?? "" };
  }

  const html = setHtml();

  return (
    <li
      className="self-end ring-4 ring-blue-500/30 bg-blue-500/10 prose-invert p-3 rounded-lg w-3/4 prose max-w-none"
      dangerouslySetInnerHTML={html}
    ></li>
  );
}
