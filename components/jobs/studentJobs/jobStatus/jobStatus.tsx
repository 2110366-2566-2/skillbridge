"use client";
import { useState } from "react";
import Image from "next/image";
import TaskPassStatusBox from "./dropDownObject/taskPassStatusBox";
import TaskWaitingStatusBox from "./dropDownObject/taskWaitingStatusBox";
import TaskFailStatusBox from "./dropDownObject/taskFailStatusBox";
import TaskInProgressStatusBox from "./dropDownObject/taskInProgressStatusBox";
import TaskPledgeStatusBox from "./dropDownObject/taskPledgeStatusBox";
import TaskPaymentStatusBox from "./dropDownObject/taskPaymentStatusBox";
import TaskDoneStatusBox from "./dropDownObject/taskDoneStatusBox";
import TaskCancelStatusBox from "./dropDownObject/taskCancelStatusBox";
import TaskDeliveredStatusBox from "./dropDownObject/taskDeliveredStatusBox";

export default function JobStatus({
    jobId,
    title,
    startDate,
    endDate,
    category,
    status,
}: {
    jobId: string,
    title: string,
    startDate: string,
    endDate: string,
    category: string,
    status: string,
}) {
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const [dropDownAbove, setDropDownAbove] = useState("27px");

  const handleDropDownClicked = () => {
    setisDropDownOpen((prev) => !prev);
    setDropDownAbove(() => {
      if (isDropDownOpen) {
        return "27px";
      } else {
        return "72px";
      }
    });
  };

  let dropDownObject = <div></div>;
  let statusColor = "#dcfce7";
  let statusWidth = "185px";

    switch (status) {
        case 'กำลังรอ':
            dropDownObject = <TaskWaitingStatusBox jobId={jobId} />
            statusColor = '#fef9c3'
            statusWidth = '215px'
            break;
        case 'ผ่านการคัดเลือก':
            dropDownObject = <TaskPassStatusBox jobId={jobId} />
            break;
        case 'ไม่ผ่านการคัดเลือก':
            dropDownObject = <TaskFailStatusBox jobId={jobId} />
            statusColor = '#ffe4e6'
            break;
        case 'รอส่งมอบงาน':
            dropDownObject = <TaskInProgressStatusBox jobId={jobId} />
            statusColor = '#fef9c3'
            statusWidth = '195px'
            break;
        case 'รอผู้จ้างจ่ายมัดจำ':
            dropDownObject = <TaskPledgeStatusBox jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'รอผู้จ้างจ่ายค่าจ้าง':
            dropDownObject = <TaskPaymentStatusBox jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'เสร็จสิ้น':
            dropDownObject = <TaskDoneStatusBox jobId={jobId} />
            statusWidth = '215px'
            break;
        case 'ถูกยกเลิกงาน':
            dropDownObject = <TaskCancelStatusBox jobId={jobId} />
            statusColor = '#ffe4e6'
            statusWidth = '195px'
            break;
        case 'ส่งมอบงานแล้ว':
            dropDownObject = <TaskDeliveredStatusBox jobId={jobId} />
            statusWidth = '215px'
            break;
        default:
            break;
    }

  return (
    <div className="flex flex-col items-end w-[335px]">
      <div
        style={{ height: isDropDownOpen ? "220px" : "175px" }}
        className="relative w-[335px] px-[20px] pt-[25px] bg-white rounded-xl shadow-lg"
      >
        <div className="w-full">
          <div className="relative">
            {/* Status Component */}
            <div
              style={{ backgroundColor: statusColor }}
              className="absolute right-0 top-0 h-[24px] rounded-full flex justify-center items-center px-[10px] py-[5px]"
            >
              <p className="text-xs">{status}</p>
            </div>

            {/* Title Component */}
            <div style={{ width: statusWidth }} className="h-[56px]">
              <p className="font-bold text-[#313866] text-xl line-clamp-2">
                {title}
              </p>
            </div>
          </div>

          {/* Period Component */}
          <div className="mt-[10px]">
            <p className="font-medium text-[15.5px] text-slate-500 text-wrap line-clamp-1">
              {`${startDate} - ${endDate}`}
            </p>
          </div>

          <div className="flex mt-[10px]">
            {/* Tag Component */}
            <div className="flex justify-center items-center bg-[#e2e8f0] px-[10px] py-[5px] mr-[5px] rounded-[4px]">
              <p className="text-sm">{category}</p>
            </div>

            {/* DropDown Button */}
            <div
              style={{ bottom: dropDownAbove }}
              className="absolute right-[16px] cursor-pointer"
            >
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
          {isDropDownOpen && dropDownObject}
        </div>
      </div>
    </div>
  );
}