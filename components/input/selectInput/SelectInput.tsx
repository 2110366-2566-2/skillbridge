import React, { ChangeEventHandler } from "react";

type Option = {
  value: any;
  title: any;
};

type Props = {
  label: string;
  value?: string;
  options: Option[];
  name: string;
  title: string;
  placeholder?: string;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  isDisabled?: boolean;
  defaultOption?: Option; // Add defaultOption prop
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
    defaultOption,
  } = props;

  return (
    <div className="flex flex-col gap-1 flex-grow">
      <label htmlFor={name} className="text-[14px] font-medium text-slate-900">
        {label}
      </label>
      <select
        id={name}
        value={value}
        className={`bg-transparent border ${errorMessage ? "border-red-600" : "border-slate-300"} text-slate-800 text-[16px] rounded-lg focus:outline-none focus:border-slate-500 block w-full p-2 placeholder:text-slate-400 disabled:opacity-75`}
        name={name}
        title={title}
        onChange={onChange}
        disabled={isDisabled}
      >
        <option className="text-slate-400" value="" disabled>
          {placeholder || (defaultOption && defaultOption.title) || "Select an option"}
        </option>
        {(defaultOption ? [defaultOption] : []).concat(options).map((option: Option) => (
          <option key={option.value} value={option.value}>
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
