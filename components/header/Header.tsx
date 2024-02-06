import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from './navbar/Navbar'

export default async function Header() {

    // TEMPORARY for check if user is authenticate or not
    const session = true;
    const isStudent = false;

    return (
      <div className="flex justify-between items-center py-4 pl-3 pr-5 md:pr-10">
        <Link href="/">
        <Image
            className='md:w-36'
            src="/logo-white.png"
            alt="logo"
            width={110}
            height={100}
        />
        </Link>
        <Navbar 
            session={session}
            isStudent={isStudent} 
        />
      </div>
    );
  }
