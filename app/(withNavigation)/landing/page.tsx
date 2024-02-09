import Image from "next/image";
import Link from "next/link";
import studentMobileImg from "@/public/images/student-mobile.png"
import studentDesktopImg from "@/public/images/student-desktop.png"
import guaranteeLogo from "@/public/logos/guatantee-logo.svg"
import { Marquee } from "@/components/maquee/Maquee";
import CommentCards from "@/components/commentCards/CommentCards";
import TypeAnimation from "@/components/typeAnimation/TypeAnimation";
import CardSlider from "@/components/cardSlider/CardSlider";

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
    <div className="flex-grow flex flex-col font-ibm w-full">
      {/* Header */}
      <div className="flex flex-col justify-center items-center text-slate-50 pt-5 pb-10 gap-3 md:gap-8 md:pb-24 md:pt-16">
        <h2 className="text-xl font-medium md:text-4xl md:font-semibold">เรามี<span className="text-pink-400">{isStudent ? ("งาน") : ("นิสิตจุฬาฯ")}</span>ด้าน...</h2>
        <TypeAnimation taskCategories={taskCategories} />
        <h2 className="text-base font-normal md:text-3xl md:font-medium">{isStudent ? ("ที่พร้อมให้คุณได้แสดงฝีมือ!") : ("ที่พร้อมเปลี่ยนไอเดียของคุณให้เป็นจริง!")}</h2>
        {/* Insert search bar here with placeholder "ค้นหางานเลย!" */}
        {isStudent ? (
          <Link href="/search" className="text-slate-800 font-bold bg-slate-50 rounded-2xl px-24 py-1 border-b-4 border-pink-400 md:text-3xl md:py-2 md:px-40">ค้นหางานเลย!</Link>
        ) : (
          <Link href="/works" className="text-slate-800 font-bold bg-slate-50 rounded-2xl px-24 py-1 border-b-4 border-pink-400 md:text-3xl md:py-2 md:px-40">โพสงานเลย!</Link>
        )}
      </div>

      {/* Body */}
    <div className="rounded-3xl bg-slate-50 h-full flex justify-center items-center">
      <div className="flex flex-col h-full py-10 md:py-14 md:max-w-[1600px] md:w-screen">

        {/* ทำไม้อง SkillBridge ? */}
        <div className="flex flex-col justify-center items-center gap-10 md:gap-24 md:px-20 lg:px-32">
          <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:w-full md:pt-10">ทำไมต้อง SkillBridge ?</h1>
          
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
          <div className="hidden md:flex md:justify-between w-full">
            <div className="flex flex-col text-left text-slate-600 pt-36 w-full">
              {isStudent ? (
                <span className="md:text-2xl lg:text-4xl font-bold">พื้นที่สำหรับ<span className="text-pink-400">นิสิตจุฬาฯ</span></span>
              ):(
                <span className="md:text-2xl lg:text-4xl font-bold">นิสิตจากมหาวิทยาลัยชั้นนำ</span>
              )} 
              <p className="md:text-sm lg:text-lg leading-[26px] w-full pb-2 border-b-2 border-slate-400">{isStudent ? ("แหล่งรวมงานฟรีแลนซ์สำหรับนิสิตจุฬาฯ") : ("นิสิตจุฬาฯ ผ่านการคัดเลือกและยืนยันตัวตน")}<br/>{isStudent ? ("ที่เปิดโอกาสให้ทุกคนได้พัฒนาฝีมือและแสดงศักยภาพให้โลกได้รู้!") : ("กับ SkillBridge สามารถตรวจสอบได้")}</p>
            </div>
            <Image
              className="md:w-[320px] md:h-auto lg:w-[360px] lg:h-auto xl:w-[600px] xl:h-auto"
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
          <div className="hidden md:flex md:justify-between w-full">
            <Image
              className=""
              src={guaranteeLogo}
              alt="students"
              width={800}
              height={800}
            />
            <div className="flex flex-col text-right text-slate-600 w-full pt-8">
              <span className="md:text-2xl lg:text-4xl font-bold">{isStudent ? ("การันตีค่าตอบแทน") : ("การันตีการจ้างงาน")}</span>
              <p className="md:text-sm lg:text-lg border-slate-400 leading-[26px] w-full pb-2 border-b-2">{isStudent ? ("ค่าตอบแทนของคุณจะได้รับความคุ้มครอง") : ("เงินของคุณจะได้รับความคุ้มครอง")}<br/>{isStudent ? ("ไม่ต้องกังวลว่าจะโดนโกง") : ("ตั้งแต่นิสิตเริ่มทํางานไปจนถึงได้รับงานที่พอใจ")}</p>
            </div>
          </div>

          {/* 3-mobile */}
          <div className="flex flex-col items-center gap-4 pb-20 md:hidden">
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
          <div className="hidden md:flex md:flex-col w-full">
            <div className="flex flex-col text-left text-slate-600 pb-8">
              <span className="md:text-2xl lg:text-4xl font-bold">{isStudent ? ("ตอบโจทย์ทุกสกิล") : ("ความสามารถหลากหลาย")}</span>
              {isStudent ? (
                <p className="md:text-sm lg:text-lg border-slate-400 leading-[26px] w-full pb-2 border-b-2">เพราะเรามีงานกว่า<span className="text-slate-900"> 25 หมวดหมู่ </span>ที่รอคุณอยู่</p>
              ) : (
                <p className="md:text-sm lg:text-lg border-slate-400 leading-[26px] w-full pb-2 border-b-2">มีนิสิตที่มีความสามารถหลากหลายกว่า<br/><span className="text-slate-900">100 คน จาก 25 หมวดหมู่</span></p>  
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:flex-col md:gap-8 md:pb-40 md:w-full">
            <Marquee taskCategories={taskCategories} isLeft={true} />
            <Marquee taskCategories={taskCategories} isLeft={false} />
        </div>

        {/* SkillBridge ใช้ยังไง ? */}
        <div className="flex flex-col justify-center items-center gap-6 pb-20 md:px-20 lg:px-32 md:pb-40">
        <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:w-full">SkillBridge ใช้ยังไง ?</h1>
          <div className="w-11/12 md:w-full h-44 border-2 rounded-lg bg-slate-100 border-slate-400 bg-transparent flex justify-center items-center md:h-[600px] md:rounded-3xl">
            <svg width="80" height="80" viewBox="0 0 170 184" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M156.417 70.3306C173.515 79.866 173.515 104.463 156.417 113.998L37.338 180.41C20.6741 189.704 0.161001 177.657 0.161002 158.576L0.161008 25.7528C0.161009 6.6725 20.6741 -5.37474 37.338 3.9189L156.417 70.3306Z" fill="#D9D9D9"/>
            </svg>
          </div>
        </div>

        {/*รีวิวผลงานจากนิสิตของเรา*/}
        <div className="flex flex-col justify-center items-center gap-6 pb-3 md:pb-12">
          <div className="md:w-full md:px-20 lg:px-32">
            {isStudent ? (
              <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:pb-1">รีวิวผลงานของ<span className="text-pink-400">เพื่อนนิสิต</span></h1>
            ):(
              <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:pb-1">รีวิวผลงานจาก<span className="text-pink-400">นิสิต</span>ของเรา</h1>
            )}
            <p className="text-[13px] text-slate-800 md:text-xl">สำเร็จไปแล้วกว่า 100 ครั้ง!</p>
          </div>
          <CommentCards />
        </div>
      </div>
    </div>
    </div>
  );
}



