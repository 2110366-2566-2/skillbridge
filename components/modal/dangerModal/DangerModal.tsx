"use client";
import { useState } from "react";
import Image from "next/image";
import cautionIcon from "@/public/icons/caution.svg";
import DangerButton from "@/components/buttons/dangerButton/DangerButton";
import SecondaryButton from "@/components/buttons/secondaryButton/SecondaryButton";

type Props = {
  message: string;
  dangerButtonMessage: string;
  secondaryButtonMessage: string;
  isShowModal: boolean;
  setShowModal: (arg0: boolean) => void;
  onDangerClick: () => void;
};

export default function DeleteModal(props: Props) {
  const {
    message,
    dangerButtonMessage,
    secondaryButtonMessage,
    isShowModal,
    setShowModal,
    onDangerClick,
  } = props;

  return (
    <>
      <div
        className={`${isShowModal ? "opacity-100" : "opacity-0 invisible"} flex duration-300 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50`}
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
            <p className=" text-slate-400 text-xl">{message}</p>
            {/*footer*/}
            <div className="flex items-center justify-end gap-5 rounded-b">
              <SecondaryButton onClick={() => setShowModal(false)}>
                {secondaryButtonMessage}
              </SecondaryButton>
              <DangerButton
                onClick={() => {
                  setShowModal(false);
                  onDangerClick();
                }}
              >
                {dangerButtonMessage}
              </DangerButton>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-40 bg-neutral-800 duration-300  ${isShowModal ? "opacity-60" : "opacity-0 invisible"}`}
      ></div>
    </>
  );
}
