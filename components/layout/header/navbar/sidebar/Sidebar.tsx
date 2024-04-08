import React, { useState, ReactNode } from "react";
import Image from "next/image";
import hamburger from "@/public/icons/hamburger.svg";
import hamburgerDark from "@/public/icons/hamburgerDark.svg";
import closeIcon from "@/public/icons/close.svg";

interface SidebarProps {
  name: string;
  userInfo: string;
  children?: ReactNode;
  isDark?: boolean;
  session?: any;
  avatar: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  name,
  userInfo,
  children,
  isDark,
  session,
  avatar,
}) => {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  return (
    <>
      {/* Hamburger button */}
      <button
        className="active:opacity-40"
        onClick={() => setHamburgerOpen((prevOpen) => !prevOpen)}
      >
        {/* Desktop (include white bg) */}
        <Image
          className="hidden md:block active:opacity-40"
          src={isDark ? hamburgerDark : hamburger}
          alt="hamburger"
          width={30}
          height={30}
        />
        {/* Mobile */}
        <Image
          className="active:opacity-40 md:hidden"
          src={hamburger}
          alt="hamburger"
          width={30}
          height={30}
        />
      </button>

      {/* Dark Background */}
      <div
        className={`bg-neutral-800 fixed top-0 right-0 left-0 bottom-0 duration-500 z-10
                ${isHamburgerOpen ? "opacity-60" : "opacity-0 invisible"}`}
      ></div>
      {/* Sidebar */}
      <div
        className={`z-20 font-ibm bg-slate-800 text-slate-50 fixed top-0 right-0 w-2/3 max-w-80 h-dvh flex flex-col items-center p-7 ease-in-out duration-500 
                ${isHamburgerOpen ? "translate-x-0 " : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-8 justify-start w-full mb-[28px]">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-start">
              <Image
                className="w-[100px] h-[100px] rounded-full"
                src={avatar}
                alt="avatar"
                width={100}
                height={100}
                style={{
                    objectFit: 'cover',
                }}
              />
              <button
                className="active:opacity-40"
                onClick={() => setHamburgerOpen((prevOpen) => !prevOpen)}
              >
                <Image
                  className="w-auto h-auto"
                  src={closeIcon}
                  alt="close"
                  width={35}
                  height={35}
                />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <p>
                <b className="font-medium text-base md:text-lg">{name}</b>
              </p>
              <p className="text-xs">{userInfo}</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Sidebar;
