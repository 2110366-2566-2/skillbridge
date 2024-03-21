"use client"

import Image from "next/image";

const paperClip = require("@/public/icons/paperClip.svg") as string;

type Props = {
    url: string;
    text: string;
};

export default function FileBox({ url, text }: Props) {

    return (
        <div
            className="w-full flex p-3 bg-slate-200 text-slate-500 rounded-md mt-[7px] hover:bg-slate-400 hover:cursor-pointer hover:shadow-md hover:text-slate-100"
            onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        >
            <div className="flex gap-3 items-center">
                <Image src={paperClip} alt="paperClip" width={16} height={16} />
                <p className="text-[14px] font-semibold">{text}</p>
            </div>
        </div>
    )
}