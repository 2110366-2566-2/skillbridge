import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Wait : waiting for ข้อตกลงและเงื่อนไขการใช้งาน & นโยบายคุ้มครองความเป็นส่วนตัว

export default function Header() {
    return (
      <div className="py-12 px-5 flex flex-col justify-center items-center gap-8 text-slate-50 text-xs font-ibm">
        <div className="w-50 h-50">
            <Image
              src="/logo-white.png"
              alt="logo"
              width={150}
              height={150}
            />
        </div>
        <div className='flex flex-col items-center gap-1'>
            <p><b>Soei.</b> จุฬาลงกรณ์มหาวิทยาลัย </p>
            <div className='flex gap-2'>
                <p>Open Source on</p>
                <div className="w-25 h-15">
                    <Image
                    src="/github-icon.png"
                    alt="github"
                    width={20}
                    height={20}
                    />
                </div>
            </div>
        </div>
        <div className='flex gap-4 opacity-60 underline underline-offset-1'>
            <Link href="/">ข้อตกลงและเงื่อนไขการใช้งาน</Link>
            <Link href="/">นโยบายคุ้มครองความเป็นส่วนตัว</Link>
        </div>
      </div>
    );
  }
