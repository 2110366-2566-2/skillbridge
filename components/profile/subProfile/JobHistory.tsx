import Image from "next/image";

export default function JobHistory({
    jobTitle,
    jobPeriod,
    jobTag
}: {
    jobTitle: string,
    jobPeriod: string,
    jobTag: string
}) {


    return (
        <div className="mt-[13px] w-full flex pb-[13px] border-b border-[#cbd5e1] md:mt-[15px] md:pb-[15px]">
            <div className="w-full flex flex-col mr-[20px] ">
                <p className="font-bold text-[18px] text-[#334155] line-clamp-1">
                    {jobTitle}
                </p>
                <div className="flex w-full">
                    <p className="text-[14px] text-[#64748b] font-medium mr-[10px] lg:text-[16px]">
                        {jobPeriod}
                    </p>
                    <div className="text-[14px] text-[#334155] text-center bg-[#E8E2F0] py-[1px] px-[6px] rounded-[4px] ">
                        {jobTag}
                    </div>
                </div>
            </div>
            <div className="flex items-center ">
                <div className="rounded-full border border-[#E2E8F0] bg-white p-[8px] hover:opacity-80 active:opacity-60 cursor-pointer">
                    <Image src={'/icons/right.svg'} width={20} height={20} alt="right" />
                </div>
            </div>

        </div>
    );
}
