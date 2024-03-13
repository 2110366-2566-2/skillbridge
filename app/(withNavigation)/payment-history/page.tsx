"use client";

import React, {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import SelectInput from "@/components/input/selectInput/SelectInput";
import PaymentHistoryCard from "@/components/paymentHistory/paymentHistoryCard/PaymentHistoryCard";
import PaymentHistoryLoadingCard from "@/components/paymentHistory/paymentHistoryLoadingCard/PaymentHistoryLoadingCard";
import {
  getUserPaymentHistory,
  getUserTransactionMonthsAndYears,
} from "@/actions/getPaymentHistory";
import { useSession } from "next-auth/react";

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
  isDeposit: boolean;
  status: "ACCEPTED" | "PENDING" | "REJECTED" | "OTHER_STATUS"; // Adjust this union type based on actual possible values
  job: {
    title: string;
  };
  isStudent: false;
  studentName: {
    salutation: string;
    firstname: string;
    lastname: string;
  };
};

export default function Page() {
  // SESSION
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  // Find the current month year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [allMonthYear, setAllMonthYear] = useState<MonthYear[]>([
    { month: currentMonth, year: currentYear },
  ]);
  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: currentMonth,
    year: currentYear,
  });
  const [paymentData, setPaymentData] = useState<Transaction[]>();
  const [isMonthYearLoad, setMonthYearLoad] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const getInitialMonthYearData = async () => {
      if(!userId) {
        console.error("No session in PaymentHistory Page")
        return;
      }
      const timeIntervals = (await getUserTransactionMonthsAndYears(
        userId,
      )) as MonthYear[];
      setAllMonthYear(timeIntervals);
      setMonthYear(timeIntervals[timeIntervals.length - 1]);
      setMonthYearLoad(false);
    };
    getInitialMonthYearData();
  }, []);

  useEffect(() => {
    const getDynamicPaymentData = async () => {
      if(isMonthYearLoad) return;
      if(!userId) {
        console.error("No session in PaymentHistory Page")
        return;
      }
      setLoading(true);
      const currentPaymentHistoryData = (await getUserPaymentHistory({
        userId: userId,
        month: monthYear?.month,
        year: monthYear?.year,
      })) as Transaction[];
      // console.log(currentPaymentHistoryData);
      setPaymentData(currentPaymentHistoryData);
      setLoading(false);
      setFirstLoad(false);
    };
    getDynamicPaymentData();
  }, [monthYear]);

  const monthsInThai = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  function formatThaiDate(dateObject: MonthYear): string {
    const monthName = monthsInThai[dateObject.month - 1] || "";
    const year = dateObject.year || "";
    return `${monthName} ${year}`;
  }

  function parseThaiDate(thaiDateString: string): MonthYear | null {
    const [monthName, yearString] = thaiDateString.split(" ");
    const monthIndex = monthsInThai.indexOf(monthName);
    const year = parseInt(yearString, 10);
    return { month: monthIndex + 1, year };
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setMonthYear(parseThaiDate(value) as MonthYear);
  };


  return (
    <div className="w-full flex justify-center">
      <>
        {paymentData?.length === 0 ? (
          <div>ไม่พบจ้า</div>
        ) : (
          <div className="w-full max-w-screen-sm">
            <div className="md:w-1/2">
              {(isLoading || isMonthYearLoad) && isFirstLoad ? (
              <SelectInput
                label="ช่วงเวลา"
               className="animate-pulse"
              /> 
              ) : (
              <SelectInput
                label="ช่วงเวลา"
                options={allMonthYear?.map((monthYear) => ({
                  value: formatThaiDate(monthYear),
                  title: formatThaiDate(monthYear),
                }))}
                name="monthYear"
                title="monthYear"
                placeholder="เลือกช่วงเวลา"
                onChange={handleChange}
                isDisabled={isLoading || isMonthYearLoad}
              />
              )}
            </div>
            <div className="flex flex-col">
              {(isLoading || isMonthYearLoad)
                ? [...Array(9)].map((_, index) => (
                    <PaymentHistoryLoadingCard key={index} />
                  ))
                : paymentData?.map((transaction: Transaction, index) => (
                    <PaymentHistoryCard key={index} {...transaction} />
                  ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
}
