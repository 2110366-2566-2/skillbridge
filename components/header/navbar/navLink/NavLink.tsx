"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";

export default function NavLink({link}) {
    
    const pathName = usePathname();
    const isActive = pathName === link.path;

    return (
        <div>
            <Link className={"w-full flex gap-8 md:hidden p-2 " + (isActive&& ("bg-slate-50 rounded-md"))} href={link.path} key={link.title}>
                <Image
                    className={"" + (isActive && ("stroke-slate-800 text-slate-800 fill-slate-800"))}
                    src={isActive ? (link.activeIcon) : (link.icon)}
                    alt="icon"
                    width={25}
                    height={25}
                /> 
                <p className={"text-lg text-slate-50 font-semibold " + (isActive && ("text-slate-800 font-bold"))}>{link.title}</p>
            </Link>
            <Link className={"hidden md:block px-5 py-2 rounded-full " + (isActive && ("bg-slate-50"))} href={link.path} key={link.title}>
                <p className={"hidden text-sm text-slate-50 md:block font-bold " + (isActive && ("text-slate-800"))}>{link.title}</p>
            </Link>
        </div>
    )
}


