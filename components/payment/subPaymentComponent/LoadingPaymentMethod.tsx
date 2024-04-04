export default function LoadingPaymentMethod() {
    return (
        <div className="mt-[13px] lg:order-1 lg:mt-0 lg:row-span-5">
            <div className="flex">
                <div className="animate-pulse bg-slate-200 h-[25px] w-[40%] rounded-lg lg:h-[30px]"></div>
            </div>
            <div className="mt-[6px] border border-[#cbd5e1] py-[8px] px-[12px] rounded-md flex flex-col items-center lg:py-[20px] lg:px-[20px]">
                <div className="animate-pulse bg-slate-200 h-[25px] w-[40%] rounded-lg lg:h-[30px] mb-[15px]"></div>
                <div className="animate-pulse bg-slate-200 h-[20px] w-[30%] rounded-lg mb-[15px]"></div>
                <div className="pt-[15px] h-[170px] w-[170px] rounded-md border border-[#CBD5E1] flex justify-center items-center lg:h-[325px] lg:w-[325px] mb-[15px]">
                    <div className="animate-pulse bg-slate-200 h-[150px] w-[150px] lg:h-[295px] lg:w-[295px] mb-[15px] rounded-lg"></div>
                </div>
                <div className="animate-pulse bg-slate-200 h-[35px] w-[115px] rounded-lg mb-[15px]"></div>
                <div className="animate-pulse bg-slate-200 h-[25px] w-[40%] rounded-lg"></div>
            </div>
        </div>
    );
}
