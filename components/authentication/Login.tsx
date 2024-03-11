"use client";
import Title from "./Title";
import LoginViaGoogle from "./LoginViaGoogle";
import Line from "./Line";
import LoginViaEmail from "./LoginViaEmail";

export default function Login() {
  return (
    <div className="flex flex-col w-[280px] mt-[40px]">
      <Title title="เข้าสู่ระบบ" highlightText="" highlightColor="" />

      <div className="mt-[30px] text-[#64748B] leading-6 text-sm w-full">
        <LoginViaGoogle />
        <Line />
      </div>

      {/* Login via Email Component */}
      <LoginViaEmail />
    </div>
  );
}
