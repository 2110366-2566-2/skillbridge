import React from "react";

export default function PaymentHistoryLoadingCard() {
  const isOpen = false;
  const status = (
    <p className="border rounded-[6px] border-slate-300 text-slate-300 bg-slate-300 text-[11px] md:text-[16px] font-bold px-[8px] py-[3px]">
      XXXXX
    </p>
  );
  return (
    <div className="flex flex-col gap-[10px] border-b border-slate-300 mt-[10px] md:mt-[20px] md:pb-[10px] animate-pulse">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center gap-2">
          <h2 className="font-bold bg-slate-300 text-slate-300 rounded-lg text-[16px] md:text-[20px]">
            XXXXXXXXXXXXXXXXXXXXX
          </h2>
          <h1 className="font-semibold bg-slate-300 text-slate-300 rounded-lg text-[20px] text-nowrap self-start md:text-[24px]">
            XXXXXX
          </h1>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-center items-center gap-[10px]">
            <p className="bg-slate-300 text-slate-300 rounded-lg font-medium text-[11px] md:text-[16px]">
              XXXXXXXXXXXXXX
            </p>
            {status}
          </div>
          <div
            className={`bg-slate-300 w-[24px] h-[24px] rounded-full md:w-[28px] md:h-[28px] transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <div
        className={`flex flex-col md:gap-[3px] border border-slate-300 rounded-[6px] md:rounded-[12px] px-[12px] md:px-[16px] transition-all duration-150 overflow-hidden ${isOpen ? "max-h-100 py-[8px] md:py-[12px] mb-[10px] md:mb-[16px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <h3 className="font-bold text-[16px] text-slate-600">XXXXXXXXXXX</h3>
        <div className="flex justify-between font-normal text-[14px] md:text-[16px] text-slate-500">
          <p>XXXXXXXXXXX</p>
          <p>XXXXXXXXXXX</p>
        </div>
        <div className="flex justify-between font-normal text-[14px] md:text-[16px] text-slate-500">
          <p>XXXXXXXXXXX</p>
          <p>XXXXXXXXXXX</p>
        </div>
        <div className="flex justify-between font-normal text-[14px] md:text-[16px] text-slate-700">
          <p>XXXXXXXXXXX</p>
          <p>XXXXXXXXXXX</p>
        </div>
      </div>
    </div>
  );
}
