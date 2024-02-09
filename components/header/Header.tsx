import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./navbar/Navbar";
import SearchBar from "./searchAndFilter/SearchBar";
import Filter from "./searchAndFilter/Filter";

const whiteLogo = require("@/public/logos/logo-white.svg") as string;

export default async function Header() {
  // TEMPORARY
  const session = true;
  const isStudent = false;

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center py-4 pl-3 pr-5 md:pr-10">
        <Link href="/landing">
          <Image
            className="w-auto h-auto md:w-36"
            src={whiteLogo}
            alt="logo"
            width={110}
            height={110}
          />
        </Link>
        <div className="hidden lg:inline-block">
          <div className="flex gap-7">
            <div>
              <SearchBar />
            </div>
            <div>
              <Filter />
            </div>
          </div>
        </div>


        <Navbar session={session} isStudent={isStudent} />
      </div>

      {/* Mobile and Tablet */}
      <div className="flex flex-col lg:hidden">
        {/* Topic */}
        <div className="font-semibold text-[30px] text-white ml-5 mb-4">
          หางาน
        </div>

        {/* SearchBar and Filter */}
        <div className="flex flex-row items-center mx-5 mb-5">
          <div className="w-full mr-[10px]">
            <SearchBar />
          </div>
          <div>
            <Filter />
          </div>
        </div>
      </div>

    </div>

  );
}
