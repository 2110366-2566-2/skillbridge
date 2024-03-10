export default function jobDescription({
    userId,
    jobId,
    jobDescription,
    nubmerOfAcceptedApplication,
    numberOfMaximumAccepted,
    title,
    period,
    tag,
    price
}: {
    userId: string,
    jobId: string,
    jobDescription: string,
    nubmerOfAcceptedApplication: string,
    numberOfMaximumAccepted: string,
    title: string,
    period: string,
    tag: string,
    price: string
}) {
    return (
        <div className="flex flex-col items-end w-[370px]">
            <div className="w-[370px] h-[215px] px-[20px] pt-[25px] bg-white rounded-xl shadow-lg">
                <div className="w-full">

                    {/* Title Component */}
                    <div className="flex">
                        <p className="font-semibold text-[#313866] text-xl line-clamp-2">
                            {title}
                        </p>
                        <div className="w-[113px] h-[25px]"></div>
                    </div>

                    {/* Period Component */}
                    <div className="mt-[10px]">
                        <p className="font-medium text-[11px] text-slate-500">
                            {period}
                        </p>
                    </div>

                    <div className="flex mt-[10px]">

                        {/* Tag Component */}
                        <div className="flex justify-center items-center bg-[#e2e8f0] px-[10px] py-[5px] mr-[5px] rounded-[4px]">
                            <p className="text-sm">
                                {tag}
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
