"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  link: {
    title: string;
    path: string;
    icon: any;
    activeIcon: any;
    onClick?: () => void;
  };
};

export default function NavButton(props: Props) {
  const { link } = props;
  const pathName = usePathname();
  const isActive = pathName === link.path;

  return (
    <Link
      className={
        "w-full flex gap-8 p-2 active:opacity-40 " +
        (isActive && "bg-slate-50 rounded-md")
      }
      href={link.path}
      onClick={link.onClick}
      key={"mobile : " + link.title}
    >
      <Image
        className={
          "w-auto h-auto " +
          (isActive && "stroke-slate-800 text-slate-800 fill-slate-800")
        }
        src={isActive ? link.activeIcon : link.icon}
        alt="icon"
        width={25}
        height={25}
      />
      <p
        className={
          "text-lg text-slate-50 font-semibold " +
          (isActive && "text-slate-800 font-bold")
        }
      >
        {link.title}
      </p>
    </Link>
  );
}
