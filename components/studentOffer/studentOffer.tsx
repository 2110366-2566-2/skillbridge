"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppliedStatus from "./dropDownObject/appliedStatus";
import WaitedForDepositStatus from "./dropDownObject/waitedForDepositStatus";
import WaitedForSubmissionStatus from "./dropDownObject/waitedForSubmissionStatus";
import SubmittedStatus from "./dropDownObject/submittedStatus";
import WaitedForWageStatus from "./dropDownObject/waitedForWageStatus";

export default function StudentOffer({
  studentId,
  jobId,
  studentName,
  applicationDate,
  applicationTime,
  status,
  price,
}: {
  studentId: string;
  jobId: string;
  studentName: string;
  applicationDate: string;
  applicationTime: string;
  status: string;
  price: string;
}) {
  const [isDropDownOpen, setisDropDownOpen] = useState(false);

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDropDownClicked = () => {
    setisDropDownOpen((prev) => !prev);
  };

  let dropDownObject = <div></div>;
  let statusColor = "#dcfce7";
  let titleWidth = windowSize.width >= 1280 ? "1015px" : "200px";
  let heightOfDropDownCard = windowSize.width >= 1280 ? "142px" : "215px";
  let heightCard = windowSize.width >= 1280 ? "100px" : "128px";
  let titleLineClamp =
    windowSize.width >= 1280 ? "line-clamp-1" : "line-clamp-2";

    switch (status) {
        case 'สมัคร':
            dropDownObject = <AppliedStatus studentId={studentId} jobId={jobId} />
            break;
        case 'สละสิทธิ์':
            statusColor = '#ffe4e6'
            heightOfDropDownCard = windowSize.width >= 1280 ? "142px" : '170px'
            break;
        case 'ปฏิเสธ':
            statusColor = '#ffe4e6'
            heightOfDropDownCard = windowSize.width >= 1280 ? "142px" : '170px'
            break;
        case 'รอจ่ายมัดจำ': // go call little's function in WaitedForDepositStatus component
            dropDownObject = <WaitedForDepositStatus studentId={studentId} jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'รอส่งมอบงาน':
            dropDownObject = <WaitedForSubmissionStatus studentId={studentId} jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'ส่งมอบงานแล้ว': 
            dropDownObject = <SubmittedStatus studentId={studentId} jobId={jobId} />
            break;
        case 'รอจ่ายค่าจ้าง': // go call little's function to pay remaining wage
            dropDownObject = <WaitedForWageStatus studentId={studentId} jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        default:
            break;
    }

    return (
        <div className={`flex flex-col w-full ${status === '' ? 'hidden' : ''}`}>
            <div style={{ height: isDropDownOpen ? heightOfDropDownCard : heightCard }} className="relative w-full px-[20px] pt-[20px] bg-white rounded-xl shadow-md">
                <div className="w-full">
                    <div className="relative">

                        {/* Price Component */}
                        <div className="absolute right-0 top-0 h-[24px] flex justify-center items-center">
                            <p className="text-2xl text-[#313866] font-semibold">
                                {price}
                            </p>
                        </div>

            {/* Title Component */}
            <div style={{ width: titleWidth }}>
              <p
                className={`font-bold text-[#313866] text-xl ${titleLineClamp}`}
              >
                {studentName}
              </p>
            </div>
          </div>

          <div className="mt-[10px] flex justify-between">
            <div className="flex">
              {/* Application Time Component */}
              <p className="font-medium text-[15.5px] text-slate-500 text-wrap line-clamp-1 mr-[10px]">
                {applicationDate} | {applicationTime}
              </p>

              {/* Status Component */}
              <div
                style={{ backgroundColor: statusColor }}
                className="h-[24px] rounded-full flex justify-center items-center px-[10px] py-[5px]"
              >
                <p className="text-xs">{status}</p>
              </div>
            </div>

            {/* DropDown Button */}
            <div className="cursor-pointer">
              <Image
                src={
                  isDropDownOpen ? "/icons/dropup.svg" : "/icons/dropdown.svg"
                }
                width={20}
                height={20}
                alt={isDropDownOpen ? "dropup" : "dropdown"}
                onClick={handleDropDownClicked}
              ></Image>
            </div>
          </div>

          {/* DropDownObject Of Each Status */}
          {isDropDownOpen && (
            <div className="w-[330px] mt-[10px] xl:w-[1150px] xl:flex xl:justify-between">
              <button className="h-[35px] bg-[#f8fafc] text-sm rounded-md w-[100%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center xl:w-[100px]">
                <p className="text-[#334155]">ไปที่โปรไฟล์</p>
              </button>
              {dropDownObject}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
