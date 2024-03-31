import Image from "next/image";
import Link from "next/link";

export default function JobHistory({
    studentId,
    jobId,
    jobTitle,
    jobPeriod,
    jobTag
}: {
    studentId: string,
    jobId: string
    jobTitle: string,
    jobPeriod: string,
    jobTag: string
}) {


    return (
        <div className="mt-[13px] w-full max-w-[600px] flex pb-[13px] border-b border-[#cbd5e1]">
            <div className="w-full flex flex-col mr-[20px]">
                <p className="font-bold text-[18px] text-[#334155] line-clamp-2 h-[3em]">
                    {jobTitle}
                </p>
                <div className="flex w-full">
                    <p className="text-[14px] text-[#64748b] font-medium mr-[10px]">
                        {jobPeriod}
                    </p>
                    <div className="text-[14px] text-[#334155] text-center bg-[#E8E2F0] py-[1px] px-[6px] rounded-[4px]">
                        {jobTag}
                    </div>
                </div>
            </div>
            <div className="flex items-center " >
                <Link className="rounded-full border border-[#E2E8F0] bg-white p-[8px] hover:opacity-80 active:opacity-60 cursor-pointer w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] flex items-center justify-center mr-[7px] md:mr-[12px] lg:mr-[18px]"
                    href={`/progress/${jobId}/${studentId}`}
                >
                    <Image src={'/icons/right.svg'} width={20} height={20} alt="right" />
                </Link>
            </div>

        </div>
    );
}
