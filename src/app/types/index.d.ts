export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
}

export interface Message {
  id: string;
  role: "assistant" | "user";
  content: [
    {
      type: "text";
      text?: string;
    }
  ];
}
