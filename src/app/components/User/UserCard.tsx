import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import UserDropdown from "./UserDropdown";

export default async function UserCard() {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return <div>Erreur</div>;
  }

  return (
    <div className="p-4">
      <UserDropdown user={user}></UserDropdown>
    </div>
  );
}
