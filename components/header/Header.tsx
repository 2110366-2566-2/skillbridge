"use client"

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./navbar/Navbar";
import { usePathname } from "next/navigation";
import LandingHeader from "./landingHeader/LandingHeader";

const whiteLogo = require("@/public/logos/logo-white.svg") as string;

export default function Header() {
  const pathName = usePathname();

  // TEMPORARY
  const session = true;
  const isStudent = true;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center py-4 pl-3 pr-5 md:pr-10">
        <Link href="/landing">
          <Image
            className="w-auto h-auto md:w-36 md:hover:scale-105 md:duration-500"
            src={whiteLogo}
            alt="logo"
            width={110}
            height={110}
          />
        </Link>
        <Navbar session={session} isStudent={isStudent} />
      </div>
      {pathName === "/landing" && (
        <LandingHeader isStudent={isStudent} />
      )}
    </div>
  );
}
