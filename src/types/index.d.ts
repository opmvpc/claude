export interface Conversation {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  role: "assistant" | "user" | "system" | "tool" | "data" | "function";
  content: string;
}

export interface Messages {
  messages: Message[];
}

export interface User {
  id: string;
  email: string;
  conversations: Conversation[];
}
