"use client";

import React from "react";
import TypeAnimation from "@/components/typeAnimation/TypeAnimation";
import Link from "next/link";
import searchIcon from "@/public/icons/search.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePathname } from "next/navigation";

type Props = {
  isStudent: boolean;
};

const taskCategories = [
  "กราฟิกดีไซน์",
  "สถาปัตย์",
  "ตกแต่งภายใน",
  "ศิลปะและภาพวาด",
  "ออกแบบ UX UI",
  "พัฒนาแอพฯมือถือ",
  "พัฒนาเว็ปไซต์",
  "ไอทีโซลูชั่น",
  "งาน IOT",
  "อินฟลูเอนเซอร์",
  "สื่อออนไลน์",
  "แอดมินออนไลน์",
  "ไลฟ์สไตล์",
  "พัฒนาตัวเอง",
  "การตลาด",
  "ธุรกิจและการเงิน",
  "รูปภาพและวีดีโอ",
  "แต่งหน้า",
  "สไตลิสต์",
  "นักแสดง",
  "นักพากย์เสียง",
  "นักร้อง / นักดนตรี",
  "ซาวด์เอ็นจิเนียร์",
  "งานเขียน",
  "ภาษา",
  "อื่น ๆ",
];

export default function LandingHeader(props: Props) {
  const pathName = usePathname();
  const { isStudent } = props;
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  function handleSearch(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (keyword.trim() !== "") {
      // Navigate to /search?keyword={inputValue}
      router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
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
          <TypeAnimation taskCategories={taskCategories} />
          <h2 className="text-base font-normal md:text-3xl md:font-medium">
            {isStudent
              ? "ที่พร้อมให้คุณได้แสดงฝีมือ!"
              : "ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นจริง!"}
          </h2>

          {isStudent ? (
            <form
              onSubmit={handleSearch}
              className="px-2 py-1 md:px-3 md:py-2 text-slate-800 font-bold bg-white rounded-2xl flex justify-center items-center border-b-4 border-pink-400 md:border-b-8 md:text-3xl md:duration-300 md:active:border-b-4 md:active:mt-1"
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
              href="/works"
              className="text-slate-800 font-bold bg-white rounded-2xl px-24 py-1 border-b-4 border-pink-400 md:border-b-8 md:text-3xl md:py-2 md:px-40 md:hover:border-slate-50 md:hover:text-white md:hover:bg-pink-400 md:duration-300 md:active:border-b-4 md:active:mt-1 "
            >
              โพสงานเลย!
            </Link>
          )}
        </div>
      )}
    </>
  );
}
