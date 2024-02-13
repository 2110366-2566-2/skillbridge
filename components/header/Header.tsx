import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./navbar/Navbar";
import LandingHeader from "./landingHeader/LandingHeader";
import getJobTags from "@/actions/getJobTags";
import whiteLogo from "@/public/logos/logo-white.svg";

export default async function Header() {
  const jobTags = await getJobTags();

  // TEMPORARY : Should use "auth" on layout?
  const session = true;
  const isStudent = true;

  return (
    <div>
      <div className="flex justify-between items-center py-5 pl-5 pr-8 md:pr-10">
        <Link href="/landing">
          <Image
            className="w-auto h-auto md:w-36 md:hover:scale-105 md:duration-500 active:opacity-40"
            src={whiteLogo}
            alt="logo"
            width={110}
            height={110}
          />
        </Link>
        <Navbar session={session} isStudent={isStudent} />
      </div>
      <LandingHeader isStudent={isStudent} jobTags={jobTags} />
    </div>
  );
}