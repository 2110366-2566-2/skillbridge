export default function LoadingJobHistoryList() {
    const loadingBox = [0, 1, 2, 3, 4, 5, 6]
    return (
        <div className="mt-[20px] w-full md:max-w-[600px] md:mt-0">
            <div className="animate-pulse bg-slate-200 h-[25px] w-[40%] rounded-lg lg:h-[30px] mb-[15px]"></div>
            <div className="border-t border-1 border-[#cbd5e1] flex flex-col items-center">
                <div className="w-full md:max-h-[750px]">
                    {loadingBox.map((index) => {
                        return (
                            <div className="mt-[13px] w-full max-w-[600px] flex pb-[13px] border-b border-[#cbd5e1]" key={index}>
                                <div className="w-full flex flex-col mr-[20px]">
                                    <div className="h-[3em] w-full">
                                        <div className="animate-pulse bg-slate-200 h-[25px] w-[75%] rounded-lg"></div>
                                    </div>
                                    <div className="flex w-full">
                                        <div className="animate-pulse bg-slate-200 h-[20px] w-[110px] rounded-lg mr-[10px]"></div>
                                        <div className="animate-pulse bg-slate-200 h-[20px] w-[80px] rounded-lg"></div>
                                    </div>
                                </div>
                                <div className="flex items-center" >
                                    <div className="animate-pulse bg-slate-200 rounded-full p-[8px] w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] mr-[7px] md:mr-[12px] lg:mr-[18px]"></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
