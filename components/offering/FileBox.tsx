"use client"

import Image from "next/image";

type Props = {
    url: string;
    src: string;
    text: string;
};

export default function FileBox({ url, src, text }: Props) {

    return (
        <div
            className="w-full flex p-3 bg-slate-200 text-slate-500 rounded-md hover:bg-slate-400 hover:cursor-pointer hover:shadow-md hover:text-slate-100"
            onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
        >
            <div className="flex gap-3 items-center">
                <Image src={src} alt={src} width={16} height={16} />
                <p className="text-[14px] font-semibold">{text}</p>
            </div>
        </div>
    )
}