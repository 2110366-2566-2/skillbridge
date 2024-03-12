'use client'
import { useState } from "react"
import Image from "next/image";

export default function StudentOffer({
    studentId,
    jobId,
    studentName,
    applicationDate,
    applicationTime,
    status,
    price
}: {
    studentId: string,
    jobId: string,
    studentName: string,
    applicationDate: string,
    applicationTime: string,
    status: string,
    price: string
}) {

    const [isDropDownOpen, setisDropDownOpen] = useState(false);
    const [dropDownAbove, setDropDownAbove] = useState('26px');

    const handleDropDownClicked = () => {
        setisDropDownOpen((prev) => !prev);
        setDropDownAbove(() => {
            if (isDropDownOpen) {
                return '26px'
            } else {
                return '106px'
            }
        })
    }

    let dropDownObject = <div></div>;
    let statusColor = '#dcfce7';
    let statusWidth = '235px';

    switch (status) {
        case 'สมัคร':
            break;
        case 'สละสิทธิ์':
            statusColor = '#ffe4e6'
            break;
        case 'ปฏิเสธ':
            statusColor = '#ffe4e6'
            break;
        case 'รอจ่ายมัดจำ':
            statusColor = '#fef9c3'
            break;
        case 'รอส่งมอบงาน':
            statusColor = '#fef9c3'
            break;
        case 'ส่งมอบงานแล้ว':
            break;
        case 'รอจ่ายค่าจ้าง':
            statusColor = '#fef9c3'
            break;
        default:
            break;
    }

    return (
        <div className="flex flex-col items-end w-[370px]">
            <div style={{ height: isDropDownOpen ? "215px" : "135px" }} className="relative w-[370px] px-[20px] pt-[20px] bg-white rounded-xl shadow-lg">
                <div className="w-full">
                    <div className="relative">

                        {/* Status Component */}
                        <div className="absolute right-0 top-0 h-[24px] flex justify-center items-center">
                            <p className="text-2xl text-[#313866] font-semibold">
                                {price}
                            </p>
                        </div>

                        {/* Title Component */}
                        <div style={{ width: statusWidth }} className="h-[56px]">
                            <p className="font-bold text-[#313866] text-xl line-clamp-2">
                                {studentName}
                            </p>
                        </div>

                    </div>

                    <div className="mt-[10px] flex">

                        {/* Application Time Component */}
                        <p className="font-medium text-[15.5px] text-slate-500 text-wrap line-clamp-1 mr-[10px]">
                            {applicationDate} | {applicationTime}
                        </p>

                        {/* Status Component */}
                        <div style={{ backgroundColor: statusColor }} className="h-[24px] rounded-full flex justify-center items-center px-[10px] py-[5px]">
                            <p className="text-xs">
                                {status}
                            </p>
                        </div>

                        {/* DropDown Button */}
                        <div style={{ bottom: dropDownAbove }} className="absolute right-[16px] cursor-pointer">
                            <Image src={isDropDownOpen ? '/icons/dropup.svg' : '/icons/dropdown.svg'} width={20} height={20} alt={isDropDownOpen ? 'dropup' : 'dropdown'} onClick={handleDropDownClicked}></Image>
                        </div>
                    </div>

                    {/* DropDownObject Of Each Status */}
                    {
                        isDropDownOpen &&
                        <div className="w-[330px] mt-[10px]">
                            <button className="h-[35px] bg-[#f8fafc] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center">
                                <p className="text-[#334155]">
                                    ไปที่โปรไฟล์
                                </p>
                            </button>
                            {/* {dropDownObject} */}
                            <div className="w-[330px] flex justify-between mt-[10px]">
                                <button className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60">
                                    ปฏิเสธ
                                </button>
                                <button className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60">
                                    ยืนยัน
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
