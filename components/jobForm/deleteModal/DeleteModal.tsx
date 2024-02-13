"use client";

import { useState } from "react";
import Image from "next/image";
import cautionIcon from "@/public/icons/caution.svg"

export default function DeleteModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-white text-[14px] rounded-[6px] bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 md:flex-grow"
      >
        ลบงาน
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <Image
                    className="w-auto h-auto md:w-36"
                    src={cautionIcon}
                    alt="logo"
                    width={20}
                    height={20}
                />
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-400 text-xl leading-relaxed">
                    ยืนยันจะลบงานนี้หรือไม่
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-5 p-6 rounded-b">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-slate-800 text-[14px] rounded-[6px] hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300 md:flex-grow"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-white text-[14px] rounded-[6px] bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 md:flex-grow"
                  >
                    ลบงาน
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
