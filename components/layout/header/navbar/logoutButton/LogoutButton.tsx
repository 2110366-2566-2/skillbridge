import React from "react";
import Image from "next/image";
import logoutIcon from "@/public/icons/logout.svg";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      className="w-full flex gap-8 p-2 active:opacity-40"
      onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}
      key="mobile : ออกจากระบบ"
    >
      <Image
        src={logoutIcon}
        alt="icon"
        width={25}
        height={25}
        className="w-auto h-auto"
      />
      <h2 className="text-lg text-red-500 font-semibold">ออกจากระบบ</h2>
    </button>
  );
}
