import React, { ChangeEvent } from "react";

type Props = {
  value: string;
  name: string;
  errorMessage: string;
  onChange: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>; 
};

export default function TextInput(props:Props) {
  const { value, name, errorMessage, onChange} = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[14px] font-medium text-slate-900">ชื่องาน</label>
      <input
        className={
          `bg-transparent text-[16px] font-regular leading-[24px] h-[40px] pl-[12px] py-[8px] pr-[56px] rounded-[6px] border border-slate-300 placeholder:text-slate-400 ` +
          (errorMessage && "border-red-600")
        }
        type="text"
        name="title"
        value={value}
        onChange={onChange}
        placeholder="งานของฉัน"
      />
      <span className="h-[14px] text-[14px] text-red-600">
        {errorMessage && errorMessage}
      </span>
    </div>
  );
}
