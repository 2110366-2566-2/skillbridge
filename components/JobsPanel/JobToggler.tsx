//Author: Notch
//Description: it is toggler that changes its state when clicks

import React, { Dispatch, SetStateAction } from "react";

type Props = {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  statusList: string[];
};

const JobToggler = ({ status, setStatus, statusList }: Props) => {
  return (
    <nav className="mb-3">
      <div className="flex flex-row gap-1 bg-slate-100 w-fit p-2 rounded-sm">
        {statusList.map((option) => (
          <button
            key={option}
            className={`${status === option ? "bg-slate-50" : ""} hover:shadow-inner font-medium text-md rounded-sm px-[12px] py-[6px] `}
            onClick={() => setStatus(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default JobToggler;
