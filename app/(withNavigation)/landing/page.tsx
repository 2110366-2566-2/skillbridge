import Image from "next/image";
import Link from "next/link";
import studentMobileImg from "@/public/images/student-mobile.png"
import studentDesktopImg from "@/public/images/student-desktop.png"
import guaranteeLogo from "@/public/logos/guatantee-logo.svg"
import { Marquee } from "@/components/maquee/Maquee";
import CommentCards from "@/components/commentCards/CommentCards";
import TypeAnimation from "@/components/typeAnimation/TypeAnimation";

const taskCategories = [
"กราฟิกดีไซน์",
"สถาปัตย์",
"ตกแต่งภายใน",
"ศิลปะและภาพวาด",
"ออกแบบ UX UI",
"พัฒนาแอพฯมือถือ",
"พัฒนาเว็ปไซต์",
"ไอทีโซลูชั่น",
"งาน IOT",
"อินฟลูเอนเซอร์",
"สื่อออนไลน์",
"แอดมินออนไลน์",
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
"งานเขียน",
"ภาษา",
"อื่น ๆ",
]

// TEMPORARY
const isStudent = false;

export default function LandingPage() {
  return (
    <div className="flex-grow flex flex-col font-ibm">
      {/* Header */}
      <div className="flex flex-col justify-center items-center text-slate-50 pt-5 pb-10 gap-3 md:gap-7 md:pb-16 md:pt-10">
        <h2 className="text-xl font-medium md:text-3xl md:font-semibold">เรามี<span className="text-pink-400">{isStudent ? ("งาน") : ("นิสิตจุฬาฯ")}</span>ด้าน...</h2>
        <TypeAnimation taskCategories={taskCategories} />
        <h2 className="text-base font-normal md:text-2xl md:font-medium">{isStudent ? ("ที่พร้อมให้คุณได้แสดงฝีมือ!") : ("ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นจริง!")}</h2>
        {/* Insert search bar here with placeholder "ค้นหางานเลย!" */}
        {isStudent ? (
          <Link href="/search" className="text-slate-800 font-bold bg-slate-50 rounded-full px-24 py-1 border-b-4 border-pink-400 md:text-2xl md:py-2 md:px-32">ค้นหางานเลย!</Link>
        ) : (
          <Link href="/works" className="text-slate-800 font-bold bg-slate-50 rounded-full px-24 py-1 border-b-4 border-pink-400 md:text-2xl md:py-2 md:px-32">โพสงานเลย!</Link>
        )}
      </div>
      
      {/* Body */}
      <div className="flex flex-col gap-14 rounded-3xl bg-slate-50 h-full py-10 md:py-14 md:gap-40">

        {/* ทำไม้อง SkillBridge ? */}
        <div className="flex flex-col justify-center items-center gap-10 md:gap-36">
          <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:w-full md:px-40">ทำไมต้อง SkillBridge ?</h1>
          
          {/* 1-mobile */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex flex-col text-center text-slate-600">
              {isStudent ? (
                <span className="text-[16px] font-semibold">พื้นที่สำหรับ<span className="text-pink-400">นิสิตจุฬาฯ</span></span>
              ):(
                <span className="text-[16px] font-semibold">นิสิตจากมหาวิทยาลัยชั้นนำ</span>
              )} 
              <p className="text-[12px] leading-[18px]">{isStudent ? ("แหล่งรวมงานฟรีแลนซ์สำหรับนิสิตจุฬาฯ") : ("นิสิตจุฬาฯ ผ่านการคัดเลือกและยืนยันตัวตน")}<br/>{isStudent ? ("ที่เปิดโอกาสให้ทุกคนได้พัฒนาฝีมือและแสดงศักยภาพให้โลกได้รู้!") : ("กับ SkillBridge สามารถตรวจสอบได้")}</p>
            </div>
            <Image
              className=""
              src={studentMobileImg}
              alt="students"
              width={350}
              height={350}
            />
          </div>
          
          {/* 1-desktop */}
          <div className="hidden md:flex md:justify-between md:px-40 md:w-full">
            <div className="flex flex-col text-left text-slate-600 pt-36 w-full">
              {isStudent ? (
                <span className="text-3xl font-semibold min-w-[400px]">พื้นที่สำหรับ<span className="text-pink-400">นิสิตจุฬาฯ</span></span>
              ):(
                <span className="text-3xl font-semibold min-w-[400px]">นิสิตจากมหาวิทยาลัยชั้นนำ</span>
              )} 
              <p className="text-base leading-[26px] w-full pb-2 border-b-2 min-w-[400px]">{isStudent ? ("แหล่งรวมงานฟรีแลนซ์สำหรับนิสิตจุฬาฯ") : ("นิสิตจุฬาฯ ผ่านการคัดเลือกและยืนยันตัวตน")}<br/>{isStudent ? ("ที่เปิดโอกาสให้ทุกคนได้พัฒนาฝีมือและแสดงศักยภาพให้โลกได้รู้!") : ("กับ SkillBridge สามารถตรวจสอบได้")}</p>
            </div>
            <Image
              className=""
              src={studentDesktopImg}
              alt="students"
              width={580}
              height={480}
            />
          </div>

          {/* 2-mobile */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex flex-col text-center text-slate-600">
              <span className="text-[16px] font-semibold">{isStudent ? ("การันตีค่าตอบแทน") : ("การันตีการจ้างงาน")}</span>
              <p className="text-[12px] leading-[18px]">{isStudent ? ("ค่าตอบแทนของคุณจะได้รับความคุ้มครอง") : ("เงินของคุณจะได้รับความคุ้มครอง")}<br/>{isStudent ? ("ไม่ต้องกังวลว่าจะโดนโกง") : ("ตั้งแต่นิสิตเริ่มทํางานไปจนถึงได้รับงานที่พอใจ")}</p>
            </div>
            <Image
              className=""
              src={guaranteeLogo}
              alt="students"
              width={280}
              height={280}
            />
          </div>

          {/* 2-desktop */}
          <div className="hidden md:flex md:justify-between md:px-40 md:w-full">
            <Image
              className=""
              src={guaranteeLogo}
              alt="students"
              width={800}
              height={800}
            />
            <div className="flex flex-col text-right text-slate-600 w-full pt-8">
              <span className="text-3xl font-semibold">{isStudent ? ("การันตีค่าตอบแทน") : ("การันตีการจ้างงาน")}</span>
              <p className="text-base leading-[26px] w-full pb-2 border-b-2">{isStudent ? ("ค่าตอบแทนของคุณจะได้รับความคุ้มครอง") : ("เงินของคุณจะได้รับความคุ้มครอง")}<br/>{isStudent ? ("ไม่ต้องกังวลว่าจะโดนโกง") : ("ตั้งแต่นิสิตเริ่มทํางานไปจนถึงได้รับงานที่พอใจ")}</p>
            </div>
          </div>

          {/* 3-mobile */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex flex-col text-center text-slate-600">
              <span className="text-[16px] font-semibold">{isStudent ? ("ตอบโจทย์ทุกสกิล") : ("ความสามารถหลากหลาย")}</span>
              {isStudent ? (
                <p className="text-[12px] leading-[18px]">เพราะเรามีงานกว่า<span className="text-slate-900"> 25 หมวดหมู่ </span>ที่รอคุณอยู่</p>
              ) : (
                <p className="text-[12px] leading-[18px]">มีนิสิตที่มีความสามารถหลากหลายกว่า<br/><span className="text-slate-900">100 คน จาก 25 หมวดหมู่</span></p>  
              )}
            </div>
            <Marquee taskCategories={taskCategories} isLeft={true} />
            <Marquee taskCategories={taskCategories} isLeft={false} />
          </div>

          {/* 3-desktop */}
          <div className="hidden md:flex md:flex-col md:justify-between md:gap-5">
            <div className="flex flex-col text-left text-slate-600 w-full px-40">
              <span className="text-3xl font-semibold">{isStudent ? ("ตอบโจทย์ทุกสกิล") : ("ความสามารถหลากหลาย")}</span>
              {isStudent ? (
                <p className="text-base leading-[26px] w-full pb-2 border-b-2">เพราะเรามีงานกว่า<span className="text-slate-900"> 25 หมวดหมู่ </span>ที่รอคุณอยู่</p>
              ) : (
                <p className="text-base leading-[26px] w-full pb-2 border-b-2">มีนิสิตที่มีความสามารถหลากหลายกว่า<br/><span className="text-slate-900">100 คน จาก 25 หมวดหมู่</span></p>  
              )}
            </div>
            <div className="w-screen flex flex-col gap-5">
              <Marquee taskCategories={taskCategories} isLeft={true} />
              <Marquee taskCategories={taskCategories} isLeft={false} />
            </div>
          </div>
        </div>

        {/* SkillBridge ใช้ยังไง ? */}
        <div className="flex flex-col justify-center items-center gap-6 px-5 md:px-40">
        <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:w-full">SkillBridge ใช้ยังไง ?</h1>
          <div className="w-full h-44 border-2 rounded-lg border-slate-400 bg-transparent flex justify-center items-center md:h-[500px]">
            <svg width="45" height="52" viewBox="0 0 45 52" fill="#D9D9D9" xmlns="http://www.w3.org/2000/svg">
              <path d="M45 26L1.3677e-06 51.9808L3.63901e-06 0.0192356L45 26Z" fill="#D9D9D9"/>
            </svg>
          </div>
        </div>

        {/*รีวิวผลงานจากนิสิตของเรา*/}
        <div className="flex flex-col justify-center items-center gap-6">
          <div className="md:w-full">
            {isStudent ? (
              <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:px-40 md:pb-1">รีวิวผลงานของ<span className="text-pink-400">เพื่อนนิสิต</span></h1>
            ):(
              <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:px-40 md:pb-1">รีวิวผลงานจาก<span className="text-pink-400">นิสิต</span>ของเรา</h1>
            )}
            <p className="text-[13px] text-slate-800 md:px-40 md:text-xl">สำเร็จไปแล้วกว่า 100 ครั้ง!</p>
          </div>
          <CommentCards />
        </div>
      </div>
    </div>
  );
}



