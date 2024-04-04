export default function LoadingPaymentInformation() {
    return (
        <div className="lg:order-2 lg:row-span-2 lg:mt-[13px]">
            <div className="flex">
                <div className="animate-pulse bg-slate-200 h-[25px] w-[40%] rounded-lg lg:h-[30px]"></div>
            </div>
            <div className="mt-[6px] border border-[#cbd5e1] py-[8px] px-[12px] rounded-md lg:py-[20px] lg:px-[20px]">
                <div className="flex mb-[10px]">
                    <div className="animate-pulse bg-slate-200 h-[25px] w-[50%] rounded-lg lg:h-[30px]"></div>
                </div>
                <div className="w-full h-[24px] flex justify-between lg:h-[26px] md:mb-[10px]">
                    <div className="animate-pulse bg-slate-200 h-[15px] w-[35%] rounded-lg lg:h-[30px]"></div>
                    <div className="animate-pulse bg-slate-200 h-[15px] w-[15%] rounded-lg lg:h-[30px]"></div>
                </div>

                <div className="w-full h-[24px] flex justify-between lg:h-[26px] md:mb-[10px]">
                    <div className="animate-pulse bg-slate-200 h-[15px] w-[35%] rounded-lg lg:h-[30px]"></div>
                    <div className="animate-pulse bg-slate-200 h-[15px] w-[15%] rounded-lg lg:h-[30px]"></div>
                </div>

                <div className="w-full h-[24px] flex justify-between lg:h-[26px] md:mb-[10px]">
                    <div className="animate-pulse bg-slate-200 h-[15px] w-[35%] rounded-lg lg:h-[30px]"></div>
                    <div className="animate-pulse bg-slate-200 h-[15px] w-[15%] rounded-lg lg:h-[30px]"></div>
                </div>
            </div>
        </div>
    );
}
