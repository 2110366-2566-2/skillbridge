import React from "react";
import loadingButton from "@/public/icons/loading-ring.svg";
import Image from "next/image";

type Props = {
  bgColor: string;
  textColor: string;
  text: string;
  className?: string
};

export default function LoadingButton(props: Props) {
  const { bgColor, textColor, text, className } = props;
  return (
    <button
      type="button"
      title="loadingButton"
      className={`flex gap-2 justify-center items-center border border-slate-300 px-[8px] py-[8px] md:py-[12px] text-[14px] rounded-[6px] md:flex-grow ${bgColor} ${textColor} ${className}`}
    >
      <Image
        className=""
        src={loadingButton}
        alt="logo"
        width={20}
        height={20}
      />
      {text}
    </button>
  );
}
