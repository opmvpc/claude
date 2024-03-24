import { ChatBox } from "@/app/components/ChatBox";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect(
      `/api/auth/login?post_login_redirect_url=/conversations/${params.id}`
    );
  }

  return (
    <div className="h-full">
      <ChatBox conversationId={params.id}></ChatBox>
    </div>
  );
}
