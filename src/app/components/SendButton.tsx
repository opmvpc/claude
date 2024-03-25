"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export default function SendButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      aria-label="Send message"
      aria-disabled={pending}
      isIconOnly
      title="Envoyer le message"
    >
      <i className="ri-send-plane-2-line text-xl"></i>
    </Button>
  );
}
