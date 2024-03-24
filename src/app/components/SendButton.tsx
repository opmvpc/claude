"use client";

import { useFormStatus } from "react-dom";
import { Button, Tooltip } from "@nextui-org/react";

export default function SendButton() {
  const { pending } = useFormStatus();
  return (
    <Tooltip content="Envoyer">
      <Button
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        isIconOnly
      >
        <i className="ri-send-plane-2-line text-xl"></i>
      </Button>
    </Tooltip>
  );
}
