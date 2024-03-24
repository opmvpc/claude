"use server";

import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import { v4 as uuidv4 } from "uuid";
import { Conversation, Message } from "../types";
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function createConversation() {
  isAuth();

  const storage = createStorage({
    driver: fsDriver({ base: "./storage" }),
  });

  const id = uuidv4();
  const conversation = {
    id,
    name: "Nouvelle conversation",
    messages: [],
  };

  await storage.setItem("conversations:" + id, conversation);

  redirect("/conversations/" + conversation.id);
}

export async function getConversations() {
  isAuth();

  const storage = createStorage({
    driver: fsDriver({ base: "./storage" }),
  });

  const keys = await storage.getKeys("conversations");
  const conversations = await Promise.all(
    keys.map(async (key: string) => {
      const conversation = (await storage.getItem(key)) as Conversation;
      return conversation;
    })
  );

  return conversations;
}

export async function getConversation(id: string) {
  isAuth();

  const storage = createStorage({
    driver: fsDriver({ base: "./storage" }),
  });

  return (await storage.getItem("conversations:" + id)) as Conversation;
}

export async function addMessage(conversationId: string, formData: FormData) {
  isAuth();

  const storage = createStorage({
    driver: fsDriver({ base: "./storage" }),
  });

  const conversation = (await storage.getItem(
    "conversations:" + conversationId
  )) as Conversation;

  console.log(conversation);
  console.log(formData.get("message"));

  const message: Message = {
    id: uuidv4(),
    role: "user",
    content: [
      {
        type: "text",
        text: formData.get("message") as string,
      },
    ],
  };

  conversation.messages.push(message);

  await storage.setItem("conversations:" + conversationId, conversation);
}

const isAuth = async () => {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated");
  }
};
