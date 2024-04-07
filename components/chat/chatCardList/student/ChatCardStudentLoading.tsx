export default function ChatCardStudentLoading() {
    return (
        <div
            className={`animate-pulse flex flex-row items-center h-[90px] px-[16px] py-[21px] rounded-[16px] lg:h-[94px] lg:py-[20px]`}
        >
            <div
                className="bg-slate-200 min-w-[48px] min-h-[48px] rounded-full mr-4 lg:hidden"
            ></div>
            <div
                className="bg-slate-200 min-w-[54px] min-h-[54px] rounded-full hidden lg:block lg:mr-4"
            ></div>
            <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row justify-between w-full items-center">
                    <div className="min-w-[230.39px] min-h-[24px] lg:min-w-[259.19px] lg:min-h-[24px] bg-slate-200 rounded"></div>
                    <div className="min-w-[44.33px] min-h-[24px] lg:min-w-[60.27px] lg:min-h-[24px] bg-slate-200 rounded"></div>
                </div>
                <div className="min-w-[277.19px] min-h-[21px] lg:min-w-[316.8px] lg:min-h-[24px] bg-slate-200 rounded">
                </div>
            </div>
        </div>
    )
}