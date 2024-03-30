import {
  createConversation,
  getConversation,
} from "@/app/actions/conversations";
import { ChatBox } from "@/app/components/ChatBox";
import { Conversation, Message } from "@/app/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect(
      `/api/auth/login?post_login_redirect_url=/conversations/${params.id}`
    );
  }

  let conversation: Conversation | null = null;
  if (params.id) {
    conversation = await getConversation(params.id);
  } else {
    conversation = await createConversation();
    redirect(`/conversations/${conversation.id}`);
  }

  return (
    <div className="h-full">
      <ChatBox
        conversationId={conversation?.id}
        history={conversation?.messages}
      ></ChatBox>
    </div>
  );
}
