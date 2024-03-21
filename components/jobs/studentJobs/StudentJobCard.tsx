import React from "react";

type Props = {
    jobId: string;
    name: string;
    category: string;
    startDate: Date;
    endDate: Date;
    status: string;
};

const StudentJobCard = ({
    jobId,
    name,
    category,
    startDate,
    endDate,
    status,
}: Props) => {
    return (
        <div className="bg-gradient-to-r from-slate-100 px-5 py-7 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 max-w-[500px]">
            <div className="flex flex-row justify-between">
                <div className="w-[85%]">
                    <div className="h-[60px]">
                        <p className="font-semibold text-2xl line-clamp-2 hover:underline">
                            {name}
                        </p>
                    </div>
                    <div className="font-medium my-2">
                        {startDate.toLocaleDateString("en-GB")} -{" "}
                        {endDate.toLocaleDateString("en-GB")}
                    </div>
                </div>

                <div className="bg-[#dcfce7] rounded-full flex align-center w-fit h-fit py-2 px-3 mx-2 text-nowrap">
                    <p className="text-xs">{status}</p>
                </div>
            </div>

            <div className="bg-slate-200 rounded-sm p-2 w-fit">{category}</div>
        </div>
    );
};

export default StudentJobCard;
