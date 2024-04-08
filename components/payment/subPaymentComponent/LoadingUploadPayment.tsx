export default function LoadingUploadPayment() {
    return (
        <div className="flex flex-col gap-1 flex-grow mt-[13px] lg:order-3 lg:row-span-3">
            <div className="flex mb-[5px]">
                <div className="animate-pulse bg-slate-200 h-[25px] w-[40%] rounded-lg lg:h-[30px]"></div>
            </div>
            <div className="flex items-center justify-center w-full flex-col">
                <label className={`animate-pulse flex flex-col items-center justify-center w-full border-[1px] border-slate-300 border-dashed rounded-lg bg-transparent lg:border-2 `}>
                    <div className="flex flex-col gap-2 items-center justify-center p-3 lg:p-12 w-full">
                        <div className="mb-3 px-[15px] h-[32px] rounded-lg animate-pulse bg-slate-200 w-[20%] lg:h-[40px]"></div>
                        <div className="animate-pulse bg-slate-200 h-[20px] w-[40%] rounded-lg lg:h-[30px]"></div>
                    </div>
                </label>

                <div className="mt-[13px] flex w-full justify-between lg:justify-between lg:mt-[18px] gap-x-5">
                    <div className="animate-pulse bg-slate-200 h-[46px] w-full rounded-lg "></div>
                    <div className="animate-pulse bg-slate-200 h-[46px] w-full rounded-lg "></div>
                </div>
            </div>
        </div>
    );
}
