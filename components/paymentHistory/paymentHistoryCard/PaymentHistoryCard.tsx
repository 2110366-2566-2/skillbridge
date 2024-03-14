"use client";

import { useState } from "react";
import Image from "next/image";
import downArrowDark from "@/public/icons/downArrowDark.svg";

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
  status: "ACCEPTED" | "PENDING" | "REJECTED" | "OTHER_STATUS";
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

export default function PaymentHistoryCard(props: Transaction) {
  // Open accordion state
  const [isOpen, setOpen] = useState(false);

  // Status UI
  const successStatus = (
    <p className="border rounded-[6px] border-green-600 text-green-600 text-[11px] md:text-[16px] font-bold px-[8px] py-[3px]">
      สำเร็จ
    </p>
  );
  const pendingStatus = (
    <p className="border rounded-[6px] border-amber-500 text-amber-500 text-[11px] md:text-[16px] font-bold px-[8px] py-[3px]">
      กำลังตรวจสอบ
    </p>
  );
  const failStatus = (
    <p className="border rounded-[6px] border-red-500 text-red-500 text-[11px] md:text-[16px] font-bold px-[8px] py-[3px]">
      ไม่สำเร็จ
    </p>
  );

  function formatAmount(amount: number, isStudent: boolean): string {
    const currencySymbol = "฿";
    const studentSign = isStudent ? "+" : "-";
    let netAmount = amount;
    if (isStudent) netAmount *= 0.85;
    const result = `${studentSign} ${currencySymbol}${netAmount.toLocaleString()}`;
    return result;
  }

  function formatDateThai(dateTime: Date): string {
    const optionsDate: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    };
    const optionsTime: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Intl.DateTimeFormat("th-TH", optionsDate).format(
      dateTime,
    );
    const formattedTime = new Intl.DateTimeFormat("th-TH", optionsTime).format(
      dateTime,
    );
    return `${formattedDate} | ${formattedTime} น.`;
  }

  return (
    <div
      className="flex flex-col gap-[10px] border-b border-slate-300 mt-[10px] md:mt-[20px] md:pb-[10px]"
      onClick={() => setOpen(!isOpen)}
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-2">
          <h2 className="font-bold text-slate-700 text-[16px] md:text-[20px]">
            {props.job.title}
          </h2>
          <h1
            className={`font-semibold text-[20px] text-nowrap max-h-[24px] self-start md:text-[24px] ${props.isStudent ? "text-green-600" : "text-red-500"}`}
          >
            {formatAmount(props.amount, props.isStudent)}
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-[10px]">
            <p className="text-slate-500 font-medium text-[11px] md:text-[16px]">
              {formatDateThai(props.createdAt)}
            </p>
            {props.status === "ACCEPTED" && successStatus}
            {props.status === "PENDING" && pendingStatus}
            {props.status === "REJECTED" && failStatus}
          </div>
          <Image
            className={`md:w-[28px] md:h-[28px] transition-transform ${isOpen ? "rotate-180" : ""}`}
            src={downArrowDark}
            alt="arrow"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div
        className={`flex flex-col md:gap-[3px] border border-slate-300 rounded-[6px] md:rounded-[12px] px-[12px] md:px-[16px] transition-all duration-150 overflow-hidden ${isOpen ? "max-h-100 py-[8px] md:py-[12px] mb-[10px] md:mb-[16px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <h3 className="font-bold text-[16px] text-slate-600">
          นิสิต {props.studentName.firstname} {props.studentName.lastname}
        </h3>
        <div className="flex justify-between font-normal text-[14px] md:text-[16px] text-slate-500">
          <p>
            {props.isDeposit ? "ค่ามัดจำการจ้างงาน" : "ค่าตอบแทนการจ้างงาน"}
          </p>
          <p>{props.amount * 0.85} บาท</p>
        </div>
        {!props.isStudent && (
          <>
            <div className="flex justify-between font-normal text-[14px] md:text-[16px] text-slate-500">
              <p>ค่าบริการ 15 %</p>
              <p>{props.amount * 0.15} บาท</p>
            </div>
            <div className="flex justify-between font-normal text-[14px] md:text-[16px] text-slate-700">
              <p>ยอดชำระทั้งหมด</p>
              <p>{props.amount} บาท</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
