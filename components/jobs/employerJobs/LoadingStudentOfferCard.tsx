import Image from "next/image";
import React from "react";

type Props = {};

function LoadingStudentOfferCard({}: Props) {
    return (
        <div className="bg-gradient-to-r from-slate-100 px-5 pt-7 pb-5 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 h-fit transition duration-300 ease-in-out">
            <div className="animate-pulse">
                <section className="h-[28px] lg:h-[32px] min-h[40px] w-full my-[2px] bg-slate-200 rounded"></section>

                <section className="h-[20px] mt-[4px] lg:h-[28px] min-h[40px] w-[80%] lg:w-[40%] my-[2px] bg-slate-200 rounded"></section>
            </div>
        </div>
    );
}

export default LoadingStudentOfferCard;
