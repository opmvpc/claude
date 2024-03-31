import { createConversation } from "@/app/actions/conversations";
import Chat from "@/app/components/Chat/Chat";
import { Conversation } from "@/app/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect(
      `/api/auth/login?post_login_redirect_url=/conversations/${params.id}`
    );
  }

  let conversation: Conversation | null = null;
  if (!params.id) {
    conversation = await createConversation();
    redirect(`/conversations/${conversation.id}`);
  }

  return (
    <div className="h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Chat conversationId={params.id}></Chat>
      </Suspense>
    </div>
  );
}
