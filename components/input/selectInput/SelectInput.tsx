import React, { ChangeEventHandler } from "react";

type Option = {
  value: any;
  title: any;
};

type Props = {
  label: string;
  value?: string;
  options?: Option[];
  name?: string;
  title?: string;
  placeholder?: string;
  errorMessage?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  isDisabled?: boolean;
  className?: string;
};

export default function SelectInput(props: Props) {
  const {
    label,
    value,
    options,
    name,
    title,
    placeholder,
    errorMessage,
    onChange,
    isDisabled,
    className,
  } = props;

  return (
    <div className={`flex flex-col gap-1 flex-grow ${className}`}>
      <label htmlFor={name} className="text-[14px] font-medium text-slate-900">
        {label}
      </label>
      <select
        id={name}
        value={value}
        className={`bg-transparent border ${errorMessage ? "border-red-600" : "border-slate-300"} text-slate-800 text-[16px] rounded-lg focus:outline-none focus:border-slate-500 block w-full px-2 py-1 placeholder:text-slate-400 disabled:opacity-75`}
        name={name}
        title={title}
        onChange={onChange}
        disabled={isDisabled}
      >
        <option className="text-slate-400" value="" disabled>
          {placeholder || "Select an option"}
        </option>
        {options?.map((option: Option, index) => (
            <option key={index} value={option.value}>
              {option.title}
            </option>
          ))}
      </select>
      <span className="h-[14px] text-[14px] text-red-600">
        {errorMessage && errorMessage}
      </span>
    </div>
  );
}
