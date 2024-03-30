export interface Conversation {
  id: string;
  name: string;
  messages?: Message[];
}

export interface Message {
  id: string;
  role: "assistant" | "user" | "system" | "tool" | "data" | "function";
  content: string;
}

export interface User {
  id: string;
  email: string;
  conversations: string[];
}
