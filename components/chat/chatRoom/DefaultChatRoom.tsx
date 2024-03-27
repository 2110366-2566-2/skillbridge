import Image from "next/image";
import logoBlackBig from "@/public/logos/logo-black-big.svg";

export default function DefaultChatRoom() {
    return (
        <div className="h-[80vh] w-full flex flex-col gap-6 justify-center items-center bg-neutral-100 border border-[#CBD5E1]">
            <Image
                className="opacity-90"
                src={logoBlackBig}
                alt="logoBlackBig"
                width={568}
                height={240}
            />
            <div className="font-medium text-[24px] text-slate-800 opacity-90">
                ยินดีต้อนรับเข้าสู่ SkillBridge Chat!
            </div>
        </div>
    )
}