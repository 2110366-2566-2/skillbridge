"use client";

import { useState } from "react";
import Image from "next/image";
import cautionIcon from "@/public/icons/caution.svg";
import LoadingButton from "../loadingButton/LoadingButton";

type Props = {
  isDisabled: boolean;
  deleteAction: any;
};

export default function DeleteModal(props: Props) {
  const { isDisabled, deleteAction } = props;
  const [showModal, setShowModal] = useState(false);
  const [isDeleteClick, setDeleteClick] = useState(false);

  return (
    <>
      {isDeleteClick ? (
        <LoadingButton
          bgColor="bg-red-500"
          textColor="text-slate-50"
          text="กำลังลบ..."
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-white text-[14px] rounded-[6px] bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 md:flex-grow disabled:opacity-75"
          disabled={isDisabled}
        >
          ลบงาน
        </button>
      )}
      <div
        className={`${showModal ? "opacity-100" : "opacity-0 invisible"} flex duration-300 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50`}
      >
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="rounded-lg shadow-lg flex flex-col justify-center items-center px-12 py-5 gap-5 bg-white">
            {/*body*/}
            <Image
              className=""
              src={cautionIcon}
              alt="logo"
              width={60}
              height={60}
            />
            <p className=" text-slate-400 text-xl">ยืนยันจะลบงานนี้หรือไม่</p>
            {/*footer*/}
            <div className="flex items-center justify-end gap-5 rounded-b">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-slate-800 text-[14px] rounded-[6px] hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300 md:flex-grow"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setDeleteClick(true);
                  deleteAction();
                }}
                className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-white text-[14px] rounded-[6px] bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 md:flex-grow"
              >
                ลบงาน
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-neutral-800 duration-300  ${showModal ? "opacity-60" : "opacity-0 invisible"}`}
      ></div>
    </>
  );
}
