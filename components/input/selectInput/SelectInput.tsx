import React, { ChangeEvent, ChangeEventHandler } from "react";

type Props = {
  label: string;
  value: string;
  jobTags: {
    id: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
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
    jobTags,
    name,
    title,
    placeholder,
    errorMessage,
    onChange,
  } = props;
  return (
    <div className="flex flex-col gap-1 flex-grow">
      <label htmlFor={name} className="text-[14px] font-medium text-slate-900">
        {label}
      </label>
      <select
        id={name}
        value={value}
        className="bg-transparent border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:border-slate-500 block w-full p-2 placeholder:text-slate-400"
        name={name}
        title={title}
        onChange={onChange}
      >
        <option className="text-slate-400" value="" disabled>
          {placeholder}
        </option>
        {jobTags.map((jobTag: any) => (
          <option key={jobTag.id} value={jobTag.id}>
            {jobTag.title}
          </option>
        ))}
      </select>
      <span className="h-[14px] text-[14px] text-red-600">
        {errorMessage && errorMessage}
      </span>
    </div>
  );
}
