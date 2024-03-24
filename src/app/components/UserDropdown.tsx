"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { User } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export default function UserDropdown({ user }: { user: any }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          className="cursor-pointer"
          name={user.email}
          avatarProps={{
            src: user.picture ?? "https://i.pravatar.cc/",
          }}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="log-out">
          <LogoutLink postLogoutRedirectURL="/login">Se déconnecter</LogoutLink>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
