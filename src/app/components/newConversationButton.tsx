"use client";
import { Button, Tooltip } from "@nextui-org/react";
import { createConversation } from "../actions/conversations";

export default function NewConversationButton() {
  return (
    <Tooltip content="Nouvelle conversation">
      <Button
        isIconOnly
        aria-label="Nouvelle conversation"
        onClick={async () => {
          await createConversation();
        }}
      >
        <i className="ri-edit-box-line text-lg"></i>
      </Button>
    </Tooltip>
  );
}
