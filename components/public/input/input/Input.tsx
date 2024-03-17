import React, { ChangeEventHandler } from "react";

type Props = {
  type: string;
  label: string;
  value: any;
  name: string;
  placeholder: string;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isDisabled: boolean;
  min?: string;
};

export default function Input(props: Props) {
  const {
    type,
    label,
    value,
    name,
    placeholder,
    errorMessage,
    onChange,
    isDisabled,
    min,
  } = props;
  return (
    <div className="flex flex-col gap-1 flex-grow">
      <label htmlFor={name} className="text-[14px] font-medium text-slate-900">
        {label}
      </label>
      <input
        id={name}
        className={`bg-transparent border ${errorMessage ? "border-red-600" : "border-slate-300"} text-slate-800 text-[16px] rounded-lg focus:outline-none focus:border-slate-500 block w-full p-2 placeholder:text-slate-400 disabled:opacity-75`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
        min={min}
      />
      <span className="h-[14px] text-[14px] text-red-600">
        {errorMessage && errorMessage}
      </span>
    </div>
  );
}
