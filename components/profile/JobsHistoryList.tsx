'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import JobHistory from "./subProfile/JobHistory";

export default function JobsHistoryList({
    allJobsHistory
}: {
    allJobsHistory: any
}) {

    const router = useRouter();

    return (
        <div className="mt-[20px] w-full ">
            <p className="font-bold text-[24px] text-[#94A3B8]">
                ประวัติการทำงาน
            </p>
            <div className="border-t border-1 border-[#cbd5e1] flex flex-col items-center w-full">
                {
                    allJobsHistory ?
                        <div className="w-full">
                            <JobHistory jobTitle="งานที่อยากทำมันมีด้;ยหรอฟร่ะ ยากมากมายเอ้าก่ายกอง" jobPeriod="26/02/67 - 30/02/67" jobTag="การเรียน" />
                            <JobHistory jobTitle="งานที่อยากทำมันมีด้;ยหรอฟร่ะ ยากมากมายเอ้าก่ายกอง" jobPeriod="26/02/67 - 30/02/67" jobTag="การเรียน" />
                            <JobHistory jobTitle="งานที่อยากทำมันมีด้;ยหรอฟร่ะ ยากมากมายเอ้าก่ายกอง" jobPeriod="26/02/67 - 30/02/67" jobTag="การเรียน" />
                            <JobHistory jobTitle="งานที่อยากทำมันมีด้;ยหรอฟร่ะ ยากมากมายเอ้าก่ายกอง" jobPeriod="26/02/67 - 30/02/67" jobTag="การเรียน" />
                            <JobHistory jobTitle="งานที่อยากทำมันมีด้;ยหรอฟร่ะ ยากมากมายเอ้าก่ายกอง" jobPeriod="26/02/67 - 30/02/67" jobTag="การเรียน" />
                            <JobHistory jobTitle="งานที่อยากทำมันมีด้;ยหรอฟร่ะ ยากมากมายเอ้าก่ายกอง" jobPeriod="26/02/67 - 30/02/67" jobTag="การเรียน" />
                        </div>
                        :
                        <div className="mt-[40px]">
                            <Image src={'/icons/notFound.svg'} width={156} height={156} alt="not found" />
                            <p className="font-medium text-[24px] text-[#64748b] mt-[15px] text-center">
                                ไม่พบงาน
                            </p>
                        </div>
                }
            </div>

        </div>
    );
}
