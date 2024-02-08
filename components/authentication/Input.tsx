export default function Input({ label, inputType, warning }: { label: string, inputType: string, warning: string }) {
    return (
        <div className="w-full">
            <label htmlFor={label} className="text-sm leading-5 mb-[5px] inline-block">{label}</label>
            <div className="h-[40px] border border-[#CBD5E1] rounded-md px-[12px] focus-within:ring-2 flex item-center">
                <input id={label} type={inputType} placeholder={label} className="h-full text-md outline-none w-full" />
            </div>
            <p className="mt-[8px] text-sm leading-5 text-[#64748B] hidden">{warning}</p>
        </div>
    )
}
