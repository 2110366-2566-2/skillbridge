import React from "react";
import Link from "next/link";
import Image from "next/image";
import whiteLogo from "@/public/logos/logo-white.svg";
import githubLogo from "@/public/logos/github-logo.svg";

// Wait : waiting for ข้อตกลงและเงื่อนไขการใช้งาน & นโยบายคุ้มครองความเป็นส่วนตัว
export default function Footer() {
  return (
    <div className="py-12 px-5 flex flex-col justify-center items-center gap-8 text-slate-50 text-xs font-ibm">
      <Link href="/landing">
        <Image
          className="w-auto h-auto md:w-44 md:hover:scale-105 md:duration-500 active:opacity-40"
          src={whiteLogo}
          alt="logo"
          width={150}
          height={150}
        />
      </Link>
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3 md:text-base">
        <p>
          <b>Soei.</b> จุฬาลงกรณ์มหาวิทยาลัย{" "}
        </p>
        <p className="hidden md:block">|</p>
        <Link
          href="https://github.com/SoeiCorp/skillbridge"
          className="flex gap-2 items-center md:hover:opacity-80 md:duration-300 active:opacity-40"
        >
          <p>Open Source on</p>
          <Image src={githubLogo} alt="github" width={20} height={20} />
        </Link>
      </div>
      <div className="flex gap-4 opacity-60 underline underline-offset-1">
        <Link href="/landing" className="md:hover:opacity-80 md:duration-300 active:opacity-40">
          ข้อตกลงและเงื่อนไขการใช้งาน
        </Link>
        <Link href="/landing" className="md:hover:opacity-80 md:duration-300 active:opacity-40">
          นโยบายคุ้มครองความเป็นส่วนตัว
        </Link>
      </div>
    </div>
  );
}
