import React from "react";

export default function CommentCardsLoading() {
  return (
    <div className="flex gap-10 w-full justify-center">
      <div className="border border-slate-200 rounded-[20px] bg-white drop-shadow-md min-w-[300px] min-h-[280px] p-5 gap-2 shrink-0 md:min-h-[380px] md:min-w-[380px] md:p-8">
        <div className="flex animate-pulse flex-col gap-5">
          <div className="min-w-[230px] min-h-[70px] bg-slate-200 mb-2 rounded-md"></div>
          <div className="min-w-[230px] min-h-[70px] bg-slate-200 mb-2 rounded-md"></div>
          <div className="flex gap-5 w-full">
            <div className="min-w-[100px] rounded-full bg-slate-200"></div>
            <div className="min-h-[70px] bg-slate-200 mb-2 rounded-md w-full"></div>
          </div>
        </div>
      </div>
      <div className="border border-slate-200 rounded-[20px] bg-white drop-shadow-md min-w-[300px] min-h-[280px] p-5 gap-2 shrink-0 md:min-h-[380px] md:min-w-[380px] md:p-8 hidden md:block">
        <div className="flex animate-pulse flex-col gap-5">
          <div className="min-w-[230px] min-h-[70px] bg-slate-200 mb-2 rounded-md"></div>
          <div className="min-w-[230px] min-h-[70px] bg-slate-200 mb-2 rounded-md"></div>
          <div className="flex gap-5 w-full">
            <div className="min-w-[100px] rounded-full bg-slate-200"></div>
            <div className="min-h-[70px] bg-slate-200 mb-2 rounded-md w-full"></div>
          </div>
        </div>
      </div>
      <div className="border border-slate-200 rounded-[20px] bg-white drop-shadow-md min-w-[300px] min-h-[280px] p-5 gap-2 shrink-0 md:min-h-[380px] md:min-w-[380px] md:p-8 hidden lg:block">
        <div className="flex animate-pulse flex-col gap-5">
          <div className="min-w-[230px] min-h-[70px] bg-slate-200 mb-2 rounded-md"></div>
          <div className="min-w-[230px] min-h-[70px] bg-slate-200 mb-2 rounded-md"></div>
          <div className="flex gap-5 w-full">
            <div className="min-w-[100px] rounded-full bg-slate-200"></div>
            <div className="min-h-[70px] bg-slate-200 mb-2 rounded-md w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
