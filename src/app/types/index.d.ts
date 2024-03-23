export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
}

export interface Message {
  id: string;
  type: "text" | "image";
  content: string;
}
