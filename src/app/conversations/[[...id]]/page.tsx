import { getConversation } from "@/app/actions/conversations";
import { ChatBox } from "@/app/components/ChatBox";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 1;
export const dynamicParams = true;

export default async function Page({ params }: { params: { id: string } }) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect(
      `/api/auth/login?post_login_redirect_url=/conversations/${params.id}`
    );
  }

  let conversation = null;
  if (params.id) {
    conversation = await getConversation(params.id);
  }
  console.log(conversation);

  return (
    <div className="h-full">
      <ChatBox
        conversationId={conversation?.id}
        history={conversation?.messages}
      ></ChatBox>
    </div>
  );
}
