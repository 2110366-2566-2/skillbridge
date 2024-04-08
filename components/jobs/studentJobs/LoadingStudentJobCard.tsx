import Image from "next/image";
import React from "react";

type Props = {};

function LoadingStudentJobCard({}: Props) {
    return (
        <div className="bg-gradient-to-r from-slate-100 px-5 py-7 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 max-w-[500px] h-fit transition duration-300 ease-in-out">
            <div className="animate-pulse">
                <section className="h-[60px] w-[85%] bg-slate-200 rounded"></section>

                <section className="my-2 h-[24px] bg-slate-200 rounded-sm p-2 w-[40%]"></section>

                <div className="flex flex-row justify-between">
                    <section className="h-[40px] w-[20%] bg-slate-200 rounded"></section>
                </div>
            </div>
        </div>
    );
}

export default LoadingStudentJobCard;
