"use client"

import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import downArrowDark from "@/public/icons/downArrowDark.svg"

type Transaction = {
    id: string;
    jobId: string;
    studentId: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    employerUserId: string;
    amount: number;
    receiptImageName: string;
    status: 'ACCEPTED' | 'PENDING' | 'REJECTED' | 'OTHER_STATUS'; // Adjust this union type based on actual possible values
};

export default function PaymentHistoryCard(props:Transaction) {
    const [isOpen, setOpen] = useState(false);


    const successStatus = (<p className='border rounded-[6px] border-green-600 text-green-600 text-[11px] font-bold px-[8px] py-[3px]'>สำเร็จ</p>);
    const pendingStatus = (<p className='border rounded-[6px] border-amber-500 text-amber-500 text-[11px] font-bold px-[8px] py-[3px]'>กำลังตรวจสอบ</p>);
    const failStatus = (<p className='border rounded-[6px] border-red-500 text-red-500 text-[11px] font-bold px-[8px] py-[3px]'>ไม่สำเร็จ</p>);

    
    
    return (
        <div 
            className='flex flex-col gap-[10px] border-b border-slate-300'
            onClick={() => setOpen(!isOpen)}
        >
            <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                    <h2 className='font-bold text-slate-700 text-[16px]'>ทำ Frontend LMS ชื่อดังในจุฬา</h2>
                    <h1 className='font-semibold text-red-500 text-[20px]'>- ฿1,000</h1>
                </div>
                <div className='flex justify-between'>
                    <div className='flex justify-center items-center gap-[10px]'>
                        <p className='text-slate-500 font-medium text-[11px]'>26/02/67  |  19.01 น.</p>
                        {successStatus}
                    </div>
                    <Image
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    src={downArrowDark}
                    alt="arrow"
                    width={24}
                    height={24}
                    />
                </div>
            </div>
            <div className={`flex flex-col border border-slate-300 rounded-[6px] px-[12px] transition-all duration-150 overflow-hidden ${isOpen ? ("max-h-100 py-[8px] mb-[10px] opacity-100") : ("max-h-0 opacity-0")}`}>
                <h3 className='font-bold text-[16px] text-slate-600'>นิสิต สุรพีร์ สุวรรณ์</h3>
                <div className='flex justify-between font-normal text-[14px] text-slate-500'>
                    <p>ค่ามัดจำการจ้างงาน</p>
                    <p>100 บาท</p>
                </div>
                <div className='flex justify-between font-normal text-[14px] text-slate-500'>
                    <p>ค่าบริการ 15 %</p>
                    <p>15 บาท</p>
                </div>
                <div className='flex justify-between font-normal text-[14px] text-slate-700'>
                    <p>ยอดชำระทั้งหมด</p>
                    <p>115 บาท</p>
                </div>
            </div>
        </div>
        
    )
    }
