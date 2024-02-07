import Image from "next/image"
import noavatar from "@/public/icons/noavatar.svg"
import doubleQuote from "@/public/icons/double-quote.svg"

export default function CommentCard() {
  return (
    <div className="border border-slate-200 rounded-[20px] bg-white drop-shadow-md w-[300px] h-[215px] flex flex-col justify-between p-5 gap-2">
        <div className="flex gap-5 items-start">
            <Image
                src={doubleQuote}
                alt="quote"
                height={35}
                width={35}
            />
            <div className="flex flex-col">
                <h3 className="text-[14px] font-bold pb-2 text-right">#เว็บไซต์และแอพฯ</h3>
                <p className="text-[11px] text-slate-500 leading-[18px]">ใช้ SkillBridge ช่วยประหยัดเวลาได้มากค่ะ เพราะมีเพื่อนนิสิตที่มีความสามารถหลากหลาย มีผลงานการันตี และรีวิวดีด้วย ทำให้มั่นใจได้ว่าจะได้เว็ปไซต์ที่ตรงกับความต้องการเราจริงๆ</p>
            </div>
        </div>
        <div className="flex gap-3">
            <Image
                src={noavatar}
                alt="avatar"
                height={40}
                width={40}
            />
            <div className="flex flex-col">
                <h3 className="text-[15px] font-medium pb-1">คุณบุ๊ค อยากนอน</h3>
                <p className="text-[10px] text-slate-400">Co-Founder บริษัทน้องบิวสั่งข้าว จำกัด (มหาชน)</p>
            </div>
        </div>
    </div>
  )
}
