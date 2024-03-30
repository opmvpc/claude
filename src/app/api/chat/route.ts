import { Conversation, Message } from "@/app/types";
import Anthropic from "@anthropic-ai/sdk";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AnthropicStream, StreamingTextResponse } from "ai";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../storage";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated");
  }

  const { messages, conversationId } = await req.json();

  const response = await anthropic.messages.create({
    messages,
    model: "claude-3-sonnet-20240229",
    stream: true,
    max_tokens: 4096,
  });

  const stream = AnthropicStream(response, {
    onStart: async () => {
      await addMessage(conversationId, messages[messages.length - 1].content);
    },
    onToken: async (token: string) => {},
    onCompletion: async (completion: string) => {
      await addMessage(conversationId, completion, "assistant");
    },
  });

  return new StreamingTextResponse(stream);
}

async function addMessage(
  conversationId: string,
  messageContent: string,
  role: "user" | "assistant" = "user"
): Promise<Message> {
  const conversation = (await storage.getItem(
    `conversations:${conversationId}`
  )) as Conversation;

  const message: Message = {
    id: uuidv4(),
    role: role,
    content: messageContent,
  };

  conversation.messages?.push(message);

  await storage.setItem(`conversations:${conversationId}`, conversation);

  revalidatePath(`/conversations/${conversationId}`);

  return message;
}
