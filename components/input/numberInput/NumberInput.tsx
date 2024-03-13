import React, { ChangeEventHandler } from "react";

type Props = {
  value: any;
  name: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function NumberInput(props: Props) {
  const { value, name, placeholder, onChange } = props;

  return (
    <div className="relative">
      <input
        type="number"
        className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-2"
        placeholder={placeholder}
        name={name}
        min={0}
        value={value === 0 ? "" : value}
        onChange={onChange}
      />
      <div className="absolute text-slate-400 inset-y-0 end-3 flex items-center pointer-events-none">
        บาท
      </div>
    </div>
  );
}
