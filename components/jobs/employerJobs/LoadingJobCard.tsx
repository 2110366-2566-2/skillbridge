import React from "react";

type Props = {};

function LoadingJobCard({}: Props) {
    return (
        <div className="bg-gradient-to-r from-slate-100 px-5 pt-7 pb-2 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 max-w-[500px]">
            <div className="animate-pulse">
                <section className="h-[60px] w-[85%] bg-slate-200 rounded"></section>

                <section className="mt-3 h-[24px] bg-slate-200 rounded-sm p-2 w-[40%]"></section>

                <section className="my-3 h-[32px] w-[20%] bg-slate-200 rounded"></section>
                <section className="h-[14px] w-[30%] bg-slate-200 rounded mb-[6px]"></section>
                <hr className="mb-2" />

                <section className="h-10 w-full bg-slate-200 rounded"></section>
                <hr className="my-2" />

                <div className="flex flex-row align-text-bottom justify-between">
                    <section className="h-[20px] w-full bg-slate-200 rounded my-[4px]"></section>
                </div>
            </div>
        </div>
    );
}

export default LoadingJobCard;
