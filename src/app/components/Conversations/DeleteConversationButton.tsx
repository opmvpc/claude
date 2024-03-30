"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { deleteConversation } from "../../actions/conversations";

export default function DeleteConversationButton({
  conversationId,
}: {
  conversationId: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        onClick={onOpen}
        aria-label="Supprimer la conversation"
        title="Supprimer la conversation"
        className="text-zinc-600 transition hover:text-red-500"
      >
        <i className="ri-delete-bin-6-line  text-xl"></i>
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Supprimer une conversation
              </ModalHeader>
              <ModalBody>
                <p>
                  Vous êtes sur le point de supprimer une conversation.
                  Êtes-vous sûr de vouloir continuer ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Annuler
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    await deleteConversation(conversationId);
                  }}
                >
                  <i className="ri-delete-bin-6-line text-xl"></i>
                  Supprimer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
