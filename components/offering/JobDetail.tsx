"use server"

import EmployerDetail from "./EmployerDetail"

export default async function JobDetail() {

    return (
        <>
            <div className="w-full rounded-t-[9.54px] border-slate-300 border-[0.5px] border-b-0 flex flex-col px-6 py-4 md:w-[390px] lg:w-[543px]">
                <div className="font-bold text-[24px] text-[#313866] h-[3em] line-clamp-2 lg:text-[30px]">รับสมัคร TA วิชา Comp Prog เทอม 1/2567</div>
                <div className="text-[14px] text-slate-800 mt-3 lg:text-[16px]">
                    <span className="font-semibold">หมวดหมู่</span>
                    <span className="inline-block bg-slate-200 rounded py-1 px-2 ml-2">
                        การสอน
                    </span>
                </div>
                <div className="flex flex-col mt-4">
                    <div className="font-semibold text-[14px] text-slate-800 mb-1">
                        คำอธิบายเกี่ยวกับงาน
                    </div>
                    <hr className="border-slate-300" />
                    <div className="text-[14px] text-[#838383] my-[9px]">
                        รักการสอนเด็ก ๆ, มีความรู้ python numpy, ขยัน ซื่อสัตย์ ประหยัด อดทน ตกน้ำไม่ไหล ตกไฟไม่ไหม้ ยายมีขายหอย ยายมอยขายหมีวันดีคืนดีหมียายมอยไปจับหอยยายมี หนึ่งสองสาม ปลาฉลามขึ้นบก สี่ห้าหก จิ้งจกยัดไส้ แปดเก้าสิบ มีมั้ย ไม่รู้ ​ฉันจำไม่ได้
                    </div>
                    <hr className="border-slate-300" />
                </div>
                <div className="flex flex-row justify-between mt-4">
                    <div className="flex flex-col text-[15px] text-slate-600">
                        <div><span className="font-semibold">วันเริ่มต้นงาน : </span><span className="font-medium">26/02/24</span></div>
                        <div><span className="font-semibold">วันสิ้นสุดงาน : </span><span className="font-medium">30/02/24</span></div>
                    </div>
                    <div>
                        <div className="flex flex-col text-[15px]">
                            <div className="font-semibold text-green-600 self-end">ยังเปิดรับอยู่</div>
                            {/* TODO: Works with Nut's page */}
                            <div className="hidden font-semibold self-end">ยังเปิดรับอยู่</div>
                            <div className="text-[#838383]"><span className="font-medium">รับแล้ว : </span><span className="font-semibold">2 / 10</span><span className="font-medium"> คน</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <EmployerDetail />
        </>
    )
}