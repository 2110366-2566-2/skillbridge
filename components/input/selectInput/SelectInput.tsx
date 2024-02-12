import React, { ChangeEvent, ChangeEventHandler } from "react";

type Props = {
  label: string;
  value: any;
  options: any[];
  name: string;
  title: string;
  placeholder: string;
  errorMessage?: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
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
  } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[14px] font-medium text-slate-900">
        {label}
      </label>
      <select
        id={name}
        className="bg-transparent border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:border-slate-500 block w-full p-[5.75px]"
        name={name}
        title={title}
        value={value}
        defaultValue="" // Use defaultValue instead of selected
        onChange={onChange} // Add onChange handler for handling selection changes
      >
        <option className="text-slate-400" value="" disabled>
          {placeholder}
        </option>
        {options.map((element: any) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
      <span className="h-[14px] text-[14px] text-red-600">
        {errorMessage && errorMessage}
      </span>
    </div>
  );
}
