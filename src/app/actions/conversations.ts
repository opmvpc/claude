"use server";

import { storage } from "../../storage";
import { v4 as uuidv4 } from "uuid";
import { Conversation, User } from "../../types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getUser, isAuth } from "@/auth";

export async function createConversation(): Promise<Conversation> {
  isAuth();

  const id = uuidv4();
  const conversation = {
    id,
    name: "Nouvelle conversation",
    messages: [],
  };

  let users = (await storage.getItem("users")) as User[];
  if (users === null) {
    // create users storage
    users = [];
    await storage.setItem("users", users);
  }

  const user = await getUser();
  const currentUser = users.find((u) => u.id === user.id);

  if (currentUser === undefined) {
    // Add user to storage
    users.push({
      id: user.id,
      email: user.email ?? "no-email",
      conversations: [id],
    });
  } else {
    // Update user
    currentUser.conversations.push(id);
  }

  await storage.setItem("users", users);

  await storage.setItem(`conversations:${id}`, conversation);

  revalidatePath("/conversations");

  return conversation;
}

export async function getConversations() {
  await isAuth();

  const user = await getUser();
  const users = (await storage.getItem("users")) as User[];
  if (users === null) {
    return [];
  }

  const currentUser = users.find((u) => u.id === user.id);
  if (currentUser === undefined) {
    return [];
  }

  const keys = currentUser.conversations.map((id) => `conversations:${id}`);
  let conversations = await Promise.all(
    keys.map(async (key: string) => {
      const conversation = (await storage.getItem(key)) as Conversation;
      return conversation;
    })
  );

  return conversations.map((conversation) => {
    return {
      id: conversation.id,
      name: conversation.name,
    };
  });
}

export async function getConversation(id: string): Promise<Conversation> {
  await isAuth();

  return (await storage.getItem(`conversations:${id}`)) as Conversation;
}

export async function deleteConversation(conversationId: string) {
  await isAuth();

  await storage.removeItem(`conversations:${conversationId}`);

  const user = await getUser();
  const users = (await storage.getItem("users")) as User[];
  const currentUser = users.find((u) => u.id === user.id);
  if (currentUser === undefined) {
    return;
  }

  const index = currentUser.conversations.indexOf(conversationId);
  if (index > -1) {
    currentUser.conversations.splice(index, 1);
  }

  await storage.setItem("users", users);

  if (currentUser.conversations.length > 0) {
    redirect(`/conversations/${currentUser.conversations[0]}`);
  } else {
    redirect("/conversations");
  }
}
