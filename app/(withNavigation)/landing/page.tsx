import Image from "next/image";
import studentImg from "@/public/images/student-mobile.png"
import guaranteeLogo from "@/public/logos/guatantee-logo.svg"
import { Marquee } from "@/components/maquee/Maquee";
import CommentCards from "@/components/commentCards/CommentCards";

const taskCategories = [
"กราฟิกดีไซน์",
"สถานปัตยกรรมและการตกแต่งภายใน",
"ศิลปะและภาพวาด",
"ออกแบบ UX UI",
"พัฒนาแอพพลิเคชั่นมือถือ",
"พัฒนาเว็ปไซต์",
"ไอทีโซลูชั่น",
"งาน IOT",
"อินฟลูเอนเซอร์",
"สื่อออนไลน์",
"จัดการร้านค้าออนไลน์",
"ไลฟ์สไตล์",
"พัฒนาตัวเอง",
"การตลาด",
"ธุรกิจและการเงิน",
"รูปภาพและวีดีโอ",
"แต่งหน้า",
"สไตลิสต์",
"นักแสดง",
"นักพากย์เสียง",
"นักร้อง / นักดนตรี",
"ซาวด์เอ็นจิเนียร์",
"งานเขียน / บทความ",
"ภาษา",
"อื่น ๆ",
]

export default function LandingPage() {
  return (
    <div className="flex-grow flex flex-col font-ibm">
      <div className="flex flex-col justify-center items-center text-slate-50 pt-5 pb-10 gap-3">
        <h2 className="text-xl font-medium">เรามี<span className="text-pink-400">นิสิตจุฬาฯ</span>ด้าน...</h2>
        <h1 className="text-4xl font-semibold">เว็บไซต์ และ แอพฯ |</h1>
        <h2 className="text-base font-normal">ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นจริง!</h2>
        <button className="text-slate-800 font-bold bg-slate-50 rounded-full px-24 py-1 border-b-4 border-pink-400">โพสงานเลย!</button>
      </div>
      <div className="flex flex-col gap-20 rounded-3xl bg-slate-50 h-full px-5 py-10">
        <div className="flex flex-col justify-center items-center gap-10">
          
          <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)]">ทำไมต้อง SkillBridge ?</h1>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col text-center text-slate-600">
              <span className="text-[16px] font-semibold">นิสิตจากมหาวิทยาลัยชั้นนำ</span>
              <p className="text-[12px] leading-[18px]">นิสิตจุฬาฯ ผ่านการคัดเลือกและยืนยันตัวตน <br/> กับ SkillBridge สามารถตรวจสอบได้</p>
            </div>
            <Image
              className=""
              src={studentImg}
              alt="students"
              width={350}
              height={350}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col text-center text-slate-600">
              <span className="text-[16px] font-semibold">การันตีการจ้างงาน</span>
              <p className="text-[12px] leading-[18px]">เงินของคุณจะได้รับความคุ้มครอง<br/>ตั้งแต่นิสิตเริ่มทํางานไปจนถึงได้รับงานที่พอใจ</p>
            </div>
            <Image
              className=""
              src={guaranteeLogo}
              alt="students"
              width={280}
              height={280}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col text-center text-slate-600">
              <span className="text-[16px] font-semibold">ความสามารถหลากหลาย</span>
              <p className="text-[12px] leading-[18px]">มีนิสิตที่มีความสามารถหลากหลายกว่า<br/><span className="text-slate-900">100 คน จาก 25 หมวดหมู่</span></p>
            </div>
            <Marquee taskCategories={taskCategories} isLeft={true} />
            <Marquee taskCategories={taskCategories} isLeft={false} />
          </div>

        </div>

        <div className="flex flex-col justify-center items-center gap-6">
          <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)]">SkillBridge ใช้ยังไง ?</h1>
          <div className="w-full h-44 border-2 rounded-lg border-slate-400 bg-transparent flex justify-center items-center">
            <svg width="45" height="52" viewBox="0 0 45 52" fill="#D9D9D9" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 26L1.3677e-06 51.9808L3.63901e-06 0.0192356L45 26Z" fill="#D9D9D9"/>
            </svg>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-6">
          <div>
            <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)]">รีวิวผลงานจาก<span className="text-pink-400">นิสิต</span>ของเรา</h1>
            <p className="text-[13px] text-slate-800">สำเร็จไปแล้วกว่า 100 ครั้ง!</p>
          </div>
          <CommentCards />
        </div>


      </div>
    </div>
  );
}



