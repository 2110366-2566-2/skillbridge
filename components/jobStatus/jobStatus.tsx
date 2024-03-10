'use client'
import { useState } from "react"
import Image from "next/image";
import TaskPassStatusBox from "./dropDownObject/taskPassStatusBox";
import TaskWaitingStatusBox from "./dropDownObject/taskWaitingStatusBox";
import TaskFailStatusBox from "./dropDownObject/taskFailStatusBox";
import TaskInProgressStatusBox from "./dropDownObject/taskInProgressStatusBox";
import TaskPledgeStatusBox from "./dropDownObject/taskPledgeStatusBox";
import TaskPaymentStatusBox from "./dropDownObject/taskPaymentStatusBox";
import TaskDoneStatusBox from "./dropDownObject/taskDoneStatusBox";
import TaskCancelStatusBox from "./dropDownObject/taskCancelStatusBox";

export default function JobStatus({
    userId,
    jobId,
    title,
    period,
    tag,
    status,
}: {
    userId: string,
    jobId: string,
    title: string,
    period: string,
    tag: string,
    status: string,
}) {

    // <TaskPassStatusBox userId={userId} jobId={jobId} />
    // <TaskWaitingStatusBox userId={userId} jobId={jobId} />
    // <TaskFailStatusBox userId={userId} jobId={jobId} />
    // <TaskInProgressStatusBox userId={userId} jobId={jobId} />
    // <TaskPledgeStatusBox userId={userId} jobId={jobId} />
    // <TaskPaymentStatusBox userId={userId} jobId={jobId} />
    // <TaskCancelStatusBox userId={userId} jobId={jobId} />

    const [isDropDown, setIsDropDown] = useState(false);

    const handleDropDownClicked = () => {
        setIsDropDown((prev) => !prev);
    }

    let dropDownObject = <div></div>;
    let statusColor = '#dcfce7'
    switch (status) {
        case 'กำลังรอ':
            dropDownObject = <TaskWaitingStatusBox userId={userId} jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'ผ่านการคัดเลือก':
            dropDownObject = <TaskPassStatusBox userId={userId} jobId={jobId} />
            break;
        case 'ไม่ผ่านการคัดเลือก':
            dropDownObject = <TaskFailStatusBox userId={userId} jobId={jobId} />
            statusColor = '#ffe4e6'
            break;
        case 'รอส่งมอบงาน':
            dropDownObject = <TaskInProgressStatusBox userId={userId} jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'รอผู้จ่างจ่ายมัดจำ':
            dropDownObject = <TaskPledgeStatusBox userId={userId} jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'รอผู้จ่างจ่ายค่าจ้าง':
            dropDownObject = <TaskPaymentStatusBox userId={userId} jobId={jobId} />
            statusColor = '#fef9c3'
            break;
        case 'เสร็จสิ้น':
            dropDownObject = <TaskDoneStatusBox userId={userId} jobId={jobId} />
            break;
        case 'ถูกยกเลิกงาน':
            dropDownObject = <TaskCancelStatusBox userId={userId} jobId={jobId} />
            statusColor = '#ffe4e6'
            break;
        default:
            break;
    }

    return (
        <div className="flex flex-col items-end w-[370px]">
            <div style={{ height: isDropDown ? "215px" : "170px" }} className="w-[370px] px-[20px] pt-[25px] bg-white rounded-xl shadow-lg">
                <div className="w-full">
                    <div className="relative">

                        {/* Status Component */}
                        <div style={{ backgroundColor: statusColor }} className="absolute right-0 top-0 h-[24px] rounded-full flex justify-center items-center px-[10px] py-[5px]">
                            <p className="text-xs">
                                {status}
                            </p>
                        </div>

                        {/* Title Component */}
                        <div className="flex">
                            <p className="font-semibold text-[#313866] text-xl line-clamp-2">
                                {title}
                            </p>
                            <div className="w-[113px] h-[25px]"></div>
                        </div>

                    </div>

                    {/* Period Component */}
                    <div className="mt-[10px]">
                        <p className="font-medium text-[11px] text-slate-500">
                            {period}
                        </p>
                    </div>

                    <div className="relative flex mt-[10px]">

                        {/* Tag Component */}
                        <div className="flex justify-center items-center bg-[#e2e8f0] px-[10px] py-[5px] mr-[5px] rounded-[4px]">
                            <p className="text-sm">
                                {tag}
                            </p>
                        </div>

                        {/* DropDown Button */}
                        <div className="absolute right-0 top-1 cursor-pointer">
                            <Image src={isDropDown ? '/icons/dropup.svg' : '/icons/dropdown.svg'} width={20} height={20} alt={isDropDown ? 'dropup' : 'dropdown'} onClick={handleDropDownClicked}></Image>
                        </div>

                    </div>

                    {/* DropDownObject Of Each Status */}
                    {
                        isDropDown &&
                        dropDownObject
                    }
                </div>
            </div>
        </div>
    )
}
