import Link from "next/link";
import React from "react";

type Props = { jobId: string; studentId: string };

function progressButton({ jobId, studentId }: Props) {
    return (
        <Link
            href={`/progress/${jobId}/${studentId}`}
            className="flex justify-center items-center h-[35px] w-[12%] min-w-fit px-1 bg-slate-50 text-sm text-slate-900 border border-slate-700 rounded-md hover:shadow-md hover:border-slate-800 active:border-slate-900 transition duration-200 ease-in-out"
            target="_blank"
        >
            ความคืบหน้า
        </Link>
    );
}

export default progressButton;
