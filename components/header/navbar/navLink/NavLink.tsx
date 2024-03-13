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

export default function NavLink(props: Props) {
  const { link } = props;
  const pathName = usePathname();
  const isActive = pathName === link.path;

  return (
      <Link
        className={
          "hidden md:block px-5 py-2 rounded-full hover:opacity-70 duration-300 active:opacity-40 " +
          (isActive && "bg-slate-50")
        }
        href={link.path}
        key={"desktop : " + link.title}
      >
        <p
          className={
            "hidden text-sm text-slate-50 md:block font-bold " +
            (isActive && "text-slate-800")
          }
        >
          {link.title}
        </p>
      </Link>
  );
}
