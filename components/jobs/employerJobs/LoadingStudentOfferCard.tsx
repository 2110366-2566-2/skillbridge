import Image from "next/image";
import React from "react";

type Props = {};

function LoadingStudentOfferCard({}: Props) {
    return (
        <div className="bg-gradient-to-r from-slate-100 px-5 pt-7 pb-5 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 h-fit transition duration-300 ease-in-out">
            <div className="animate-pulse">
                <section className="h-[28px] lg:h-[32px] min-h[40px] w-full my-[2px] bg-slate-200 rounded"></section>

                <section className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <section className="h-[24px] lg:h-[32px] min-h[40px] w-[100px] my-[2px] bg-slate-200 rounded"></section>
                    </div>
                    <Image
                        src={"/icons/dropdown.svg"}
                        width={20}
                        height={20}
                        alt={"dropdown"}
                    />
                </section>
            </div>
        </div>
    );
}

export default LoadingStudentOfferCard;
