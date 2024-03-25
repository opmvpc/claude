import { Button, Link } from "@nextui-org/react";

export default function NewConversationButton() {
  return (
    <Button
      href="/conversations"
      as={Link}
      isIconOnly
      aria-label="Nouvelle conversation"
      title="Nouvelle conversation"
    >
      <i className="ri-edit-box-line text-lg"></i>
    </Button>
  );
}
