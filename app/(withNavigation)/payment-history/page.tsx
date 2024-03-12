import React from 'react'
import SelectInput from '@/components/input/selectInput/SelectInput'
import PaymentHistoryCard from '@/components/paymentHistory/PaymentHistoryCard';
import { getUserPaymentHistory, getUserTransactionMonthsAndYears } from '@/actions/getPaymentHistory';

interface MonthYear {
  month: number;
  year: number;
}

export default async function page() {

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-based
  const currentYear = currentDate.getFullYear();  
  const timeIntervals = await getUserTransactionMonthsAndYears("6945f76a-8a1b-404b-8b0c-ebd2be1aca29") as TimeInterval[];

  function formatThaiDate(dateObject: MonthYear): string {
    const monthsInThai = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม",
      "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน",
      "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const monthName = monthsInThai[dateObject.month - 1] || '';
    const year = dateObject.year || '';
    return `${monthName} ${year}`;
  }

  

  return (
    <div>
      <SelectInput
        label="ช่วงเวลา"
        options={timeIntervals.map(obj => ({ value: formatThaiDate(obj), title: formatThaiDate(obj) }))}
        name="monthYear"
        title="monthYear"
        onChange={() => console.log("Hello")}
        defaultOption={{ value: formatThaiDate(timeIntervals[timeIntervals.length - 1]), title: formatThaiDate(timeIntervals[timeIntervals.length - 1]) }}
      />
      <div className='flex flex-col'>
        <PaymentHistoryCard />
      </div>
    </div>
  )
}
