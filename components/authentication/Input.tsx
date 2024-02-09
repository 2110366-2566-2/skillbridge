export default function Input({ name, label, inputType, warning }: { name: string, label: string, inputType: string, warning: string }) {
    return (
        <div className="w-full mt-[12px]">
            <label htmlFor={label} className="text-sm leading-5 mb-[5px] inline-block">{label}</label>
            <div className="h-[40px] border border-[#CBD5E1] rounded-md px-[12px] focus-within:ring-2 flex item-center">
                <input name={name} id={label} type={inputType} placeholder={label} className="h-full text-md outline-none w-full" />
            </div>
            <p className="mt-[5px] text-sm leading-5 text-[#64748B] hidden">{warning}</p>
        </div>
    )
}
