import React, { ChangeEventHandler } from "react";

type Props = {
  label: string;
  value: string;
  name: string;
  placeholder: string;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  isDisabled: boolean;
};

export default function TextAreaInput(props: Props) {
  const {
    label,
    value,
    name,
    placeholder,
    errorMessage,
    onChange,
    isDisabled,
  } = props;
  return (
    <div className="flex flex-col gap-1 flex-grow">
      <label htmlFor={name} className="text-[14px] font-medium text-slate-900">
        {label}
      </label>
      <textarea
        id={name}
        className={
          `flex-grow bg-transparent border border-slate-300 text-slate-800 text-[14px] rounded-lg focus:outline-none focus:border-slate-500 block w-full p-2 disabled:opacity-75 ` +
          (errorMessage && "border-red-600")
        }
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      <span className="h-[14px] text-[14px] text-red-600">
        {errorMessage && errorMessage}
      </span>
    </div>
  );
}
