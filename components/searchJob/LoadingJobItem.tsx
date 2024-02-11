export default function LoadingJobItem() {
    return (
        <>
            {/* Mobile size */}
            <div className="flex flex-row justify-between items-center max-h-[81.5px] pb-4 mb-4 border-b border-slate-300 md:hidden">
                <div className="animate-pulse bg-slate-200 h-[65.5px] w-full rounded-lg"></div>
            </div>

            {/* Desktop size */}
            <div className="hidden md:inline-block md:m-[20px] md:border-[0.5px] md:border-slate-200 md:bg-white md:rounded-xl">
                <div className="animate-pulse flex flex-col justify-between min-h-[340px] min-w-[268px] p-4">
                    <div className="min-w-[236px] min-h-[87px] bg-slate-200 mb-2 rounded"></div>
                    <div className="min-w-[80px] min-h-[23.25px] bg-slate-200 mb-2 rounded"></div>
                    <div className="min-w-[64.29px] min-h-[29px] bg-slate-200 mb-2 rounded"></div>
                    <div className="min-w-[236px] min-h-[90.25px] bg-slate-200 mb-2 rounded">
                        <div className="min-w-[64.29px] min-h-[29px] bg-slate-200 mb-2 rounded"></div></div>
                    <div className="flex flex-row justify-between items-end translate-y-[5px]">
                        <div className="min-w-[95.3px] min-h-[19.67px] bg-slate-200 mb-2 rounded"></div>
                        <div className="min-w-[80.57px] min-h-[36px] bg-slate-200 mb-2 rounded translate-y-[5px]"></div>
                    </div>
                </div>
            </div>
        </>
    )
}