"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import homeIcon from "@/public/icons/home.svg";
import searchIcon from "@/public/icons/search.svg";
import workIcon from "@/public/icons/work.svg";
import logoutIcon from "@/public/icons/logout.svg";
import hambergerIcon from "@/public/icons/hamberger-button.svg";
import closeIcon from "@/public/icons/close.svg";
import NavLink from "./navLink/NavLink";
import homeDarkIcon from "@/public/icons/homeDark.svg";
import searchDarkIcon from "@/public/icons/searchDark.svg";
import workDarkIcon from "@/public/icons/workDark.svg";

const studentLinks = [
  {
    title: "หน้าแรก",
    path: "/landing",
    icon: homeIcon,
    activeIcon: homeDarkIcon,
  },
  {
    title: "ค้นหางาน",
    path: "/search",
    icon: searchIcon,
    activeIcon: searchDarkIcon,
  },
];

const employerLinks = [
  {
    title: "หน้าแรก",
    path: "/landing",
    icon: homeIcon,
    activeIcon: homeDarkIcon,
  },
  {
    title: "งานของฉัน",
    path: "/jobs",
    icon: workIcon,
    activeIcon: workDarkIcon,
  },
];

type Props = {
  session: boolean;
  isStudent: boolean;
};

export default function Navbar(props: Props) {
  const { session, isStudent } = props;
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const avatar = "/noavatar.png";
  const name = "คุณชื่อจริง นามสกุล";
  const company = "ตำแหน่ง บริษัทตัวอย่าง จำกัด (มหาชน)";

  return (
    <>
      {session ? (
        <>
          <div className="hidden font-ibm md:flex md:items-center md:gap-6 md:text-sm">
            {(isStudent ? studentLinks : employerLinks).map((link) => (
              <NavLink key={"desktop : " + link.title} link={link} />
            ))}
            <div className="flex items-center gap-3 pl-2">
              <p className="text-slate-50">{name}</p>
              <Image
                className="rounded-full"
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
              />
            </div>
          </div>

          <button
            className="z-30 md:hidden"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            {open ? (
              <Image
                className="w-auto h-auto"
                src={closeIcon}
                alt="close"
                width={35}
                height={35}
              />
            ) : (
              <Image
                className="w-auto h-auto"
                src={hambergerIcon}
                alt="hamberger"
                width={35}
                height={35}
              />
            )}
          </button>
          {open && (
            <>
              <div className="z-10 bg-neutral-800 opacity-60 absolute top-0 right-0 left-0 bottom-0 md:hidden"></div>
              <div className="font-ibm z-20 bg-slate-800 text-slate-50 absolute top-0 right-0 w-2/3 h-screen flex flex-col items-center p-7 justify-between md:hidden">
                <div className="flex flex-col gap-8 justify-start w-full">
                  <div className="flex flex-col gap-5">
                    <Image
                      className="rounded-full"
                      src={avatar}
                      alt="avatar"
                      width={70}
                      height={70}
                    />
                    <div className="flex flex-col gap-1">
                      <p>
                        <b className="font-medium">{name}</b>
                      </p>
                      <p className="text-xs">{company}</p>
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    {(isStudent ? studentLinks : employerLinks).map((link) => (
                      <NavLink key={"mobile : " + link.title} link={link} />
                    ))}
                  </div>
                </div>
                <Link
                  className="w-full flex gap-8 justify-start"
                  href="/"
                  key="mobile : ออกจากระบบ"
                >
                  <Image src={logoutIcon} alt="icon" width={30} height={30} />
                  <h2 className="text-lg font-semibold text-red-500">
                    ออกจากระบบ
                  </h2>
                </Link>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center gap-4 text-xs font-ibm md:gap-7 md:text-sm">
          <button className="bg-slate-50 px-3 py-2 rounded-md">
            <Link href="/login" className="text-slate-800 font-bold">
              เข้าสู่ระบบ
            </Link>
          </button>
          <button>
            <Link href="/register" className="text-slate-50">
              สมัครเป็นนิสิต
            </Link>
          </button>
        </div>
      )}
    </>
  );
}
