"use client"

import Image from "next/image";

const nextArrowButton = require("@/public/icons/nextArrowButton.svg") as string;

type Props = {
    task: {
        title: string,
        startDate: string | undefined,
        endDate: string | undefined,
        jobTags: string[],
        description: string,
        acceptNum: number,
        maxAcceptNum: number,
        price: number
    }
}

const FormattedDate = (inputDateString: string) => {
    const [day, month, year] = inputDateString.split('/');

    const formattedYear = year.slice(-2);
    const formattedDay = day.padStart(2, '0');
    const formattedMonth = month.padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}

export default function SearchTaskItem({ task }: Props) {
    console.log(task)
    return (
        <>
            {/* Mobile size */}
            <div className="flex flex-row justify-between items-center min-h-[70px] pb-4 mb-4 border-b border-slate-300 md:hidden">
                <div className="flex flex-col justify-between w-[210.02px]">
                    <div className="font-bold text-[#313866]">{task?.title}</div>
                    <div className="flex flex-row justify-between">
                        <div className="font-medium text-[11px] text-slate-500">{task?.startDate ? FormattedDate(task.startDate) : "ไม่มีกำหนด"} - {task?.endDate ? FormattedDate(task.endDate) : "ไม่มีกำหนด"}</div>
                        <div className="text-[11px] text-[#838383]">รับแล้ว <span className="font-medium">{task?.acceptNum} / {task?.maxAcceptNum}</span> คน</div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center">
                    <div className="font-semibold text-[20px] text-[#313866] mr-2">฿{task?.price}</div>
                    <Image
                        src={nextArrowButton}
                        alt="nextArrowButton"
                        width={40}
                        height={40}
                        // Open link in new tab
                        // TODO: Add destination route
                        onClick={() => window.open("/", "_blank", "noopener,noreferrer")}
                        role="link"
                        tabIndex={0}
                    />
                </div>
            </div>

            {/* Desktop size */}
            <div
                className="hidden md:inline-block md:m-[20px] md:border-[0.5px] md:border-slate-200 md:bg-white md:rounded-xl md:hover:shadow-xl md:hover:cursor-pointer"
                // Open link in new tab
                // TODO: Add destination route
                onClick={() => window.open("/", "_blank", "noopener,noreferrer")}
                role="link"
                tabIndex={0}
            >
                <div className="flex flex-col justify-between h-[340px] w-[268px] p-4">
                    <div className="h-[3em] font-bold text-[29px] text-[#313866] text-wrap line-clamp-2">{task?.title}</div>
                    <div className="font-medium text-[15.5px] text-slate-500 text-wrap line-clamp-1">{task?.startDate ? FormattedDate(task.startDate) : "ไม่มีกำหนด"} - {task?.endDate ? FormattedDate(task.endDate) : "ไม่มีกำหนด"}</div>
                    {task?.jobTags[0] ? (
                        <div className="text-[14px] text-slate-800">
                            <span className={`inline-block bg-slate-200 rounded py-1 px-2`}>{task?.jobTags}</span>
                        </div>
                    ) : (
                        <div className="min-w-[236px] min-h-[29px]"></div>
                    )}
                    <div className="flex flex-col">
                        <div className="font-medium text-[10.5px] text-slate-500">คำอธิบายเกี่ยวกับงาน</div>
                        <hr className="border-slate-300" />
                        <div className="h-[4.5em] text-[13px] text-[#838383] text-wrap line-clamp-3 my-[7px]">
                            {task?.description}
                        </div>
                        <hr className="border-slate-300" />
                    </div>
                    <div className="flex flex-row justify-between items-end translate-y-[5px]">
                        <div className="text-[13.12px] text-slate-500">รับแล้ว <span className="font-semibold">{task?.acceptNum} / {task?.maxAcceptNum}</span> คน</div>
                        <div className="font-semibold text-[24px] text-[#313866] translate-y-[5px]">฿{task?.price}</div>
                    </div>
                </div>
            </div>
        </>
    )
}