export default function Input({
  name,
  label,
  inputType,
  warning,
  handleChange,
  value,
}: {
  name: string;
  label: string;
  inputType: string;
  warning: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <div className="w-full mt-[12px] flex flex-col">
      <label
        htmlFor={label}
        className="text-sm leading-5 mb-[5px] inline-block"
      >
        {label}
      </label>

      <input
        name={name}
        id={name}
        type={inputType}
        placeholder={label}
        className="text-md h-[40px] border border-[#CBD5E1] rounded-md px-[12px] outline-none"
        style={{
          borderColor: warning ? "#f87171" : "#CBD5E1",
          boxShadow: warning ? "0px 0px 2px 2px rgba(248,113,113,1)" : "none",
        }}
        value={value}
        onChange={(e) => handleChange(e)}
        onFocus={(e) => {
          e.target.style.borderColor = "#9dc0fa";
          e.target.style.boxShadow = "0 0 1px 2px #9dc0fa";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = warning ? "#f87171" : "#CBD5E1";
          e.target.style.boxShadow = warning
            ? "0px 0px 2px 2px rgba(248,113,113,1)"
            : "none";
        }}
      />

      {warning && (
        <p
          id={`${name}Error`}
          className="mt-[5px] text-sm leading-5 text-[#EA4335]"
        >
          {warning}
        </p>
      )}
    </div>
  );
}
