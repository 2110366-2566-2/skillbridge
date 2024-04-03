export default function LoadingProfileInfo() {
    return (
        <div className="p-[20px] border border-1 border-[#cbd5e1] rounded-md md:px-[25px] md:py-[30px]">
            <div className="flex items-center mb-[15px] md:mb-[25px]">
                <div className="animate-pulse bg-slate-200 mr-[15px] md:mr-[20px] w-[94px] h-[94px] lg:w-[130px] lg:h-[130px] rounded-full"></div>

                <div className="flex flex-col justify-center">
                    <div className="animate-pulse bg-slate-200 h-[25px] w-[190px] lg:w-[280px] rounded-lg mb-[5px] lg:h-[30px]"></div>
                    <div className="animate-pulse bg-slate-200 h-[20px] w-[190px] lg:w-[280px] rounded-lg mb-[5px] lg:h-[25px]"></div>
                    <div className="animate-pulse bg-slate-200 h-[25px] w-[190px] lg:w-[280px] rounded-lg mb-[5px] lg:h-[30px]"></div>
                </div>
            </div>
            <div className="w-full animate-pulse bg-slate-200 h-[45px] rounded-lg mb-[15px] md:mb-[25px]"></div>

            <div className="py-[15px] w-full border-t border-[#cbd5e1] md:py-[25px]">
                <div className="w-full animate-pulse bg-slate-200 h-[105px] rounded-lg"></div>
            </div>

            <div className="flex items-center border-t border-[#cbd5e1] justify-center pt-[15px] md:pt-[25px]">
                <div className="mr-[35px] animate-pulse bg-slate-200 h-[40px] w-[110px] rounded-lg lg:h-[50px]">
                </div>
                <div className="animate-pulse bg-slate-200 h-[40px] w-[110px] rounded-lg lg:h-[50px]">
                </div>
            </div>
        </div >
    );
}
