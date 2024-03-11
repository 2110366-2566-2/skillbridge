"use client";

import React from "react";
import TypeAnimation from "@/components/typeAnimation/TypeAnimation";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";

const searchIcon = require("@/public/icons/search.svg") as string;

type Props = {
  jobTags: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }[];
  isStudent: boolean;
};

export default function LandingHeader(props: Props) {
  const pathName = usePathname();
  const { isStudent, jobTags } = props;
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  function handleSearch(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (keyword.trim() !== "") {
      // Navigate to /search?keyword={inputValue}
      router.push(`/search?q=${encodeURIComponent(keyword.trim())}`);
    }
  }

  return (
    <>
      {pathName === "/landing" && (
        <div className="flex flex-col justify-center items-center text-slate-50 pt-5 pb-10 gap-3 md:gap-8 md:pb-24 md:pt-16">
          <h2 className="text-xl font-medium md:text-4xl md:font-semibold">
            เรามี
            <span className="text-pink-400">
              {isStudent ? "งาน" : "นิสิตจุฬาฯ"}
            </span>
            ด้าน...
          </h2>
          <div className="h-[56px] md:h-[112px] flex justify-center items-center">
            <TypeAnimation jobTags={jobTags} />
          </div>
          <h2 className="text-base font-normal md:text-3xl md:font-medium">
            {isStudent
              ? "ที่พร้อมให้คุณได้แสดงฝีมือ!"
              : "ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นจริง!"}
          </h2>

          {isStudent ? (
            <form
              onSubmit={handleSearch}
              className="px-2 py-1 md:px-3 md:py-2 text-slate-800 font-bold bg-white rounded-2xl flex justify-center items-center border-b-4 border-pink-400 md:border-b-8 md:text-3xl md:duration-300 md:active:border-b-4 md:active:mt-1 active:opacity-40"
            >
              <input
                className="focus:outline-none"
                type="text"
                placeholder="ค้นหางานเลย!"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className="rounded-xl bg-pink-400 px-3 py-2 hover:opacity-80 duration-300"
                type="submit"
              >
                <Image
                  className="md:w-[30px] md:h-auto"
                  src={searchIcon}
                  alt="searchIcon"
                  width={20}
                  height={20}
                />
              </button>
            </form>
          ) : (
            <Link
              href="/jobs"
              className="text-slate-800 font-bold bg-white rounded-2xl px-24 py-1 border-b-4 border-pink-400 md:border-b-8 md:text-3xl md:py-2 md:px-40 md:hover:border-slate-50 md:hover:text-white md:hover:bg-pink-400 md:duration-300 md:active:border-b-4 md:active:mt-1 active:opacity-40 "
            >
              โพสงานเลย!
            </Link>
          )}
        </div>
      )}
    </>
  );
}
