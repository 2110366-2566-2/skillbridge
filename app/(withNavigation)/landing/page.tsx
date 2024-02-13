import Image from "next/image";
import Link from "next/link";
import getJobTags from "@/actions/getJobTags";

import Marquee from "@/components/maquee/Maquee";
import CommentCards from "@/components/commentCards/CommentCards";

const studentMobileImg =
  require("@/public/images/student-mobile.png") as string;
const studentDesktopImg =
  require("@/public/images/student-desktop.png") as string;
const guaranteeLogo = require("@/public/logos/guatantee-logo.svg") as string;

// TEMPORARY
const isStudent = true;

export default async function LandingPage() {
  const jobTags = await getJobTags();
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col h-full py-10 md:py-14 md:max-w-[1600px] md:w-full">
        {/* 1 */}
        <div className="flex flex-col justify-center items-center gap-10 md:gap-24 md:px-20 lg:px-32">
          <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:w-full md:pt-10">
            ทำไมต้อง SkillBridge ?
          </h1>

          {/* 1.1-mobile */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex flex-col text-center text-slate-600">
              {isStudent ? (
                <span className="text-[16px] font-semibold">
                  พื้นที่สำหรับ<span className="text-pink-400">นิสิตจุฬาฯ</span>
                </span>
              ) : (
                <span className="text-[16px] font-semibold">
                  นิสิตจากมหาวิทยาลัยชั้นนำ
                </span>
              )}
              <p className="text-[12px] leading-[18px]">
                {isStudent
                  ? "แหล่งรวมงานฟรีแลนซ์สำหรับนิสิตจุฬาฯ"
                  : "นิสิตจุฬาฯ ผ่านการคัดเลือกและยืนยันตัวตน"}
                <br />
                {isStudent
                  ? "ที่เปิดโอกาสให้ทุกคนได้พัฒนาฝีมือและแสดงศักยภาพให้โลกได้รู้!"
                  : "กับ SkillBridge สามารถตรวจสอบได้"}
              </p>
            </div>
            <Image
              className=""
              src={studentMobileImg}
              alt="students"
              width={350}
              height={350}
            />
          </div>

          {/* 1.1-desktop */}
          <div className="hidden md:flex md:justify-between w-full">
            <div className="flex flex-col text-left text-slate-600 pt-36 w-full">
              {isStudent ? (
                <span className="md:text-2xl lg:text-4xl font-bold">
                  พื้นที่สำหรับ<span className="text-pink-400">นิสิตจุฬาฯ</span>
                </span>
              ) : (
                <span className="md:text-2xl lg:text-4xl font-bold">
                  นิสิตจากมหาวิทยาลัยชั้นนำ
                </span>
              )}
              <p className="md:text-sm lg:text-lg leading-[26px] w-full pb-2 border-b-2 border-slate-400">
                {isStudent
                  ? "แหล่งรวมงานฟรีแลนซ์สำหรับนิสิตจุฬาฯ"
                  : "นิสิตจุฬาฯ ผ่านการคัดเลือกและยืนยันตัวตน"}
                <br />
                {isStudent
                  ? "ที่เปิดโอกาสให้ทุกคนได้พัฒนาฝีมือและแสดงศักยภาพให้โลกได้รู้!"
                  : "กับ SkillBridge สามารถตรวจสอบได้"}
              </p>
            </div>
            <Image
              className="md:w-[320px] md:h-auto lg:w-[360px] lg:h-auto xl:w-[600px] xl:h-auto hover:scale-105 duration-500"
              src={studentDesktopImg}
              alt="students"
              width={580}
              height={480}
            />
          </div>

          {/* 2.1-mobile */}
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex flex-col text-center text-slate-600">
              <span className="text-[16px] font-semibold">
                {isStudent ? "การันตีค่าตอบแทน" : "การันตีการจ้างงาน"}
              </span>
              <p className="text-[12px] leading-[18px]">
                {isStudent
                  ? "ค่าตอบแทนของคุณจะได้รับความคุ้มครอง"
                  : "เงินของคุณจะได้รับความคุ้มครอง"}
                <br />
                {isStudent
                  ? "ไม่ต้องกังวลว่าจะโดนโกง"
                  : "ตั้งแต่นิสิตเริ่มทํางานไปจนถึงได้รับงานที่พอใจ"}
              </p>
            </div>
            <Image
              className=""
              src={guaranteeLogo}
              alt="students"
              width={280}
              height={280}
            />
          </div>

          {/* 2.2-desktop */}
          <div className="hidden md:flex md:justify-between w-full">
            <Image
              className="hover:scale-105 duration-500"
              src={guaranteeLogo}
              alt="students"
              width={800}
              height={800}
            />
            <div className="flex flex-col text-right text-slate-600 w-full pt-8">
              <span className="md:text-2xl lg:text-4xl font-bold">
                {isStudent ? "การันตีค่าตอบแทน" : "การันตีการจ้างงาน"}
              </span>
              <p className="md:text-sm lg:text-lg border-slate-400 leading-[26px] w-full pb-2 border-b-2">
                {isStudent
                  ? "ค่าตอบแทนของคุณจะได้รับความคุ้มครอง"
                  : "เงินของคุณจะได้รับความคุ้มครอง"}
                <br />
                {isStudent
                  ? "ไม่ต้องกังวลว่าจะโดนโกง"
                  : "ตั้งแต่นิสิตเริ่มทํางานไปจนถึงได้รับงานที่พอใจ"}
              </p>
            </div>
          </div>

          {/* 3.1-mobile */}
          <div className="flex flex-col items-center gap-4 pb-20 md:hidden">
            <div className="flex flex-col text-center text-slate-600">
              <span className="text-[16px] font-semibold">
                {isStudent ? "ตอบโจทย์ทุกสกิล" : "ความสามารถหลากหลาย"}
              </span>
              {isStudent ? (
                <p className="text-[12px] leading-[18px]">
                  เพราะเรามีงานกว่า
                  <span className="text-slate-900"> 25 หมวดหมู่ </span>
                  ที่รอคุณอยู่
                </p>
              ) : (
                <p className="text-[12px] leading-[18px]">
                  มีนิสิตที่มีความสามารถหลากหลายกว่า
                  <br />
                  <span className="text-slate-900">100 คน จาก 25 หมวดหมู่</span>
                </p>
              )}
            </div>
            <Marquee jobTags={jobTags} isLeft={true} />
            <Marquee jobTags={jobTags} isLeft={false} />
          </div>

          {/* 3.2-desktop */}
          <div className="hidden md:flex md:flex-col w-full">
            <div className="flex flex-col text-left text-slate-600 pb-8">
              <span className="md:text-2xl lg:text-4xl font-bold">
                {isStudent ? "ตอบโจทย์ทุกสกิล" : "ความสามารถหลากหลาย"}
              </span>
              {isStudent ? (
                <p className="md:text-sm lg:text-lg border-slate-400 leading-[26px] w-full pb-2 border-b-2">
                  เพราะเรามีงานกว่า
                  <span className="text-slate-900"> 25 หมวดหมู่ </span>
                  ที่รอคุณอยู่
                </p>
              ) : (
                <p className="md:text-sm lg:text-lg border-slate-400 leading-[26px] w-full pb-2 border-b-2">
                  มีนิสิตที่มีความสามารถหลากหลายกว่า
                  <br />
                  <span className="text-slate-900">100 คน จาก 25 หมวดหมู่</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:flex-col md:gap-8 md:pb-40 md:w-full">
          <Marquee jobTags={jobTags} isLeft={true} />
          <Marquee jobTags={jobTags} isLeft={false} />
        </div>

        {/* 2 */}
        <div className="flex flex-col justify-center items-center gap-6 pb-20 md:px-20 lg:px-32 md:pb-40">
          <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:w-full">
            SkillBridge ใช้ยังไง ?
          </h1>
          <div className="w-11/12 md:w-full h-44 border-2 rounded-lg bg-slate-100 border-slate-400 bg-transparent flex justify-center items-center md:h-[600px] md:rounded-3xl">
            <svg
              width="80"
              height="80"
              viewBox="0 0 170 184"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M156.417 70.3306C173.515 79.866 173.515 104.463 156.417 113.998L37.338 180.41C20.6741 189.704 0.161001 177.657 0.161002 158.576L0.161008 25.7528C0.161009 6.6725 20.6741 -5.37474 37.338 3.9189L156.417 70.3306Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>
        </div>

        {/* 3 */}
        <div className="flex flex-col justify-center items-center gap-6 pb-3 md:pb-12">
          <div className="md:w-full md:px-20 lg:px-32">
            {isStudent ? (
              <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:pb-1">
                รีวิวผลงานของ<span className="text-pink-400">เพื่อนนิสิต</span>
              </h1>
            ) : (
              <h1 className="text-[26px] text-slate-800 font-bold [text-shadow:_0_1px_1px_rgb(0_0_0_/_25%)] md:text-5xl md:pb-1">
                รีวิวผลงานจาก<span className="text-pink-400">นิสิต</span>ของเรา
              </h1>
            )}
            <p className="text-[13px] text-slate-800 md:text-xl">
              สำเร็จไปแล้วกว่า 100 ครั้ง!
            </p>
          </div>
          <CommentCards />
        </div>
      </div>
    </div>
  );
}
