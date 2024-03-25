import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    redirect("/conversations");
  }

  return (
    <div>
      <LoginLink postLoginRedirectURL="/">Sign in</LoginLink>

      <RegisterLink postLoginRedirectURL="/">Sign up</RegisterLink>
    </div>
  );
}
