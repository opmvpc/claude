"use server";

import { storage } from "../../storage";
import { v4 as uuidv4 } from "uuid";
import { Conversation, Messages, User } from "../../types";
import { redirect } from "next/navigation";
import { getUser, isAuth } from "@/auth";

export async function createConversation(): Promise<{
  id: string;
  name: string;
}> {
  isAuth();

  const id = uuidv4();
  const message = {
    messages: [],
  };

  const conversation = {
    id,
    name: "Nouvelle conversation",
  };

  const kindeUser = await getUser();

  let user = (await storage.getItem(`users:${kindeUser.id}`)) as User;
  if (user === null) {
    // Add user to storage
    user = {
      id: kindeUser.id,
      email: kindeUser.email ?? "no-email",
      conversations: [],
    };
  }

  user.conversations.push(conversation);

  await storage.setItem(`users:${kindeUser.id}`, user);

  await storage.setItem(`conversations:${id}`, message);

  return conversation;
}

export async function getConversations() {
  await isAuth();

  const kindeUser = await getUser();

  const user = (await storage.getItem(`users:${kindeUser.id}`)) as User;
  if (user === undefined) {
    return [];
  }

  return user.conversations;
}

export async function getMessages(id: string): Promise<Messages> {
  await isAuth();

  return (await storage.getItem(`conversations:${id}`)) as Messages;
}

export async function deleteConversation(conversationId: string) {
  await isAuth();

  await storage.removeItem(`conversations:${conversationId}`);

  const kindeUser = await getUser();

  let user = (await storage.getItem(`users:${kindeUser.id}`)) as User;
  if (user === null) {
    return;
  }

  user.conversations = user.conversations.filter(
    (conversation) => conversation.id !== conversationId
  );

  await storage.setItem(`users:${kindeUser.id}`, user);

  if (user.conversations.length > 0) {
    redirect(`/conversations/${user.conversations[0].id}`);
  } else {
    redirect("/conversations");
  }
}
