"use client"

import React, { ChangeEvent, ChangeEventHandler } from 'react'
import SelectInput from '@/components/input/selectInput/SelectInput'
import PaymentHistoryCard from '@/components/paymentHistory/PaymentHistoryCard';
import { getUserPaymentHistory, getUserTransactionMonthsAndYears } from '@/actions/getPaymentHistory';
import { useState, useEffect } from 'react';
interface MonthYear {
  month: number;
  year: number;
}

interface PaymentHistoryInput {
  userId: string;
  year?: number;
  month?: number;
}

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
  job: {
    title: string;
  }
  isStudent: false;
  studentName: {
    salutation: string,
    firstname: string,
    lastname: string,
  };
};

export default function Page() {
  // TEMPORARY
  const userId = "486a6d70-abc7-4e35-9b5d-6dc9cf21c60f";

  // Find current month year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [allMonthYear, setAllMonthYear] = useState<MonthYear[]>([{month: currentMonth, year: currentYear}])
  const [monthYear, setMonthYear] = useState<MonthYear>({month: currentMonth, year: currentYear})
  const [paymentData, setPaymentData] = useState<Transaction[]>();

  useEffect(() => {
    const getInitialMonthYearData = async () => {
      const timeIntervals = await getUserTransactionMonthsAndYears(userId) as MonthYear[];
      setAllMonthYear(timeIntervals);
      setMonthYear(timeIntervals[timeIntervals.length-1]);
    }
    getInitialMonthYearData();
  }, [])

  let currentPaymentHistoryUI;
  useEffect(() => {
    const getDynamicPaymentData =async () => {
      const currentPaymentHistoryData = await getUserPaymentHistory({userId:userId, month:monthYear?.month, year:monthYear?.year}) as Transaction[];
      setPaymentData(currentPaymentHistoryData);
    }
    getDynamicPaymentData();
  }, [monthYear])

  const monthsInThai = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม",
    "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน",
    "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  function formatThaiDate(dateObject: MonthYear): string {
    const monthName = monthsInThai[dateObject.month - 1] || '';
    const year = dateObject.year || '';
    return `${monthName} ${year}`;
  }

  function parseThaiDate(thaiDateString: string): MonthYear | null {
    const [monthName, yearString] = thaiDateString.split(" ");
    const monthIndex = monthsInThai.indexOf(monthName);
    const year = parseInt(yearString, 10);
    return { month: monthIndex + 1, year };
  }

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setMonthYear(parseThaiDate(value) as MonthYear)
    // console.log(parseThaiDate(value) as MonthYear)
  };
  
  return (
    <div className='w-full flex justify-center'>
      {paymentData?.length === 0 ? (<div>ไม่พบจ้า</div>) : (
        <div className='max-w-screen-sm'>
          <div className='md:w-1/2'>
            <SelectInput
              label="ช่วงเวลา"
              options={allMonthYear?.map(monthYear => ({ value: formatThaiDate(monthYear), title: formatThaiDate(monthYear) }))}
              name="monthYear"
              title="monthYear"
              placeholder="เลือกช่วงเวลา"
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col'>
            {paymentData?.map((transaction:Transaction, index) => (
              <PaymentHistoryCard key={index} {...transaction} />
            ))}
          </div>
        </div>
      )}
    </div>  
  )
}
