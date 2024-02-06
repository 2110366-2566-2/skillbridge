import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../navbar/Navbar'

export default async function Header() {

    // TEMPORARY for check if user is authenticate or not
    const session = false;
    const isStudent = true;

    return (
      <div className="flex justify-between items-center py-4 pl-3 pr-5">
        <Link href="/">
          <div className="w-25 h-15">
            <Image
              src="/logo-white.png"
              alt="logo"
              width={110}
              height={100}
            />
          </div>
        </Link>
        <Navbar 
            session={session}
            isStudent={isStudent} 
        />
      </div>
    );
  }
