"use client"

import { useState } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import homeIcon from "@/public/icons/home.svg"
import searchIcon from "@/public/icons/search.svg"
import workIcon from "@/public/icons/work.svg"
import logoutIcon from "@/public/icons/logout.svg"
import hambergerIcon from "@/public/icons/hamberger.svg"
import closeIcon from "@/public/icons/close.svg"

const studentLinks = [
    {
      title: "หน้าแรก",
      path: "/",
      icon: homeIcon,
    },
    {
      title: "ค้นหางาน",
      path: "/search",
      icon: searchIcon,
    },
];

const employerLinks = [
    {
      title: "หน้าแรก",
      path: "/",
      icon: homeIcon,
    },
    {
      title: "งานของฉัน",
      path: "/works",
      icon: workIcon
    },
];

export default function Navbar({session, isStudent}) {
    const [open, setOpen] = useState(false);

    // TEMPORARY
    const avatar = "/noavatar.png";
    const name = "คุณชื่อจริง นามสกุล";
    const company = "ตำแหน่ง บริษัทตัวอย่าง จำกัด (มหาชน)";

    return (
        <>
            {session ? (
                <>
                    <button className="z-30" onClick={() => setOpen((prevOpen) => !prevOpen)}>
                        {open ? (
                            <Image
                                src={closeIcon}
                                alt="close"
                                width={35}
                                height={35}
                            />
                        ) : (
                            <Image
                                src={hambergerIcon}
                                alt="hamberger"
                                width={35}
                                height={35}
                            />
                        )}
                    </button>
                    {open && (
                        <>
                            <div className='z-10 bg-neutral-800 opacity-60 absolute top-0 right-0 left-0 bottom-0'></div>
                            <div className='font-ibm z-20 bg-slate-800 text-slate-50 absolute top-0 right-0 w-2/3 h-screen flex flex-col items-center p-7 justify-between'>
                                <div className='flex flex-col gap-8'>
                                    <div className='flex flex-col gap-5'>
                                        <Image
                                            className='rounded-full'
                                            src={avatar}
                                            alt="avatar"
                                            width={70}
                                            height={70}
                                        /> 
                                        <div className='flex flex-col gap-1'>
                                            <p><b className='font-medium'>{name}</b></p>
                                            <p className='text-xs'>{company}</p>
                                        </div>
                                    </div>
                                    <div className='w-full flex flex-col gap-4'>
                                        {studentLinks.map((link) => (
                                            <Link className="w-full flex gap-8" href={link.path} key={link.title}>
                                                <Image
                                                    src={link.icon}
                                                    alt="icon"
                                                    width={25}
                                                    height={25}
                                                /> 
                                                <h2 className='text-lg font-semibold'>{link.title}</h2>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Link className="w-full flex gap-8" href="/" key="logout">
                                        <Image
                                            src={logoutIcon}
                                            alt="icon"
                                            width={30}
                                            height={30}
                                        /> 
                                        <h2 className='text-lg font-semibold text-red-500'>ออกจากระบบ</h2>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )} 
                </>
            ) : (
                <div className='flex gap-4 text-xs font-ibm'>
                    <button className='bg-slate-50 px-3 py-2 rounded-md'>
                        <Link href="/login" className='text-slate-800 font-bold'>เข้าสู่ระบบ</Link>
                    </button>
                    <button>
                        <Link href="/register" className='text-slate-50'>สมัครเป็นนิสิต</Link>
                    </button>        
                </div>
            )}
        </>
    )
}



