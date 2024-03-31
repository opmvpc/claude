export default function AssistantMessage({ message }: { message?: string }) {
  function setObj() {
    return { __html: message ?? "" };
  }

  const obj = setObj();

  return (
    <li
      className="self-start ring-4 ring-violet-500/30 bg-violet-500/10 prose-invert p-3 rounded-lg w-3/4 prose max-w-none"
      dangerouslySetInnerHTML={obj}
    ></li>
  );
}
