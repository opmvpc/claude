import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const isAuth = async (): Promise<boolean> => {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated");
  }

  return true;
};

export async function getUser(): Promise<KindeUser> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user === null) {
    throw new Error("User not found");
  }

  return user;
}
