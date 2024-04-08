"use client";

import Image from "next/image";
import RatingScore from "./subProfile/RatingScore";
import EditStudentProfile from "./EditStudentProfile";
import EditEmployerProfile from "./EditEmployerProfile";
import { Session } from "next-auth";
import { useState } from "react";

export default function ProfileInfo({
  userId,
  session,
  isStudent,
  fullName,
  profileImageURL,
  description,
  averageScore,
  portfolioURL,
  workingNumber,
  workingComplete,
  organization,
  position,
}: {
  userId: string;
  session: Session | null;
  isStudent: boolean;
  fullName: string;
  profileImageURL: string;
  description: string;
  averageScore: number;
  portfolioURL: string;
  workingNumber?: number;
  workingComplete?: number;
  organization?: string;
  position?: string;
}) {
  const isEditable = session?.user?.id === userId;

  const [showEditProfile, setShowEditProfile] = useState(false);

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  if (typeof window !== "undefined") {
    if (showEditProfile) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }

  return (
    <div className="p-[20px] border border-1 border-[#cbd5e1] rounded-md md:px-[25px] md:py-[30px]">
      <div className="flex items-center mb-[15px] md:mb-[25px]">
        <Image
          src={profileImageURL ? profileImageURL : "/images/defaultProfile.svg"}
          width={130}
          height={130}
          alt="profile"
          className="mr-[15px] md:mr-[20px] w-[94px] h-[94px] lg:w-[130px] lg:h-[130px] rounded-full border border-[#778499]"
          style={{
            objectFit: "cover",
          }}
        />

        <div className="flex flex-col">
          <p className="font-bold text-[21px] text-[#334155] line-clamp-1 lg:text-[28px]">
            {fullName}
          </p>

          <p className="text-[13px] text-slate-600 mb-[7px] md:text-[14px] lg:text-[17px] lg:mb-[4px]">
            {isStudent
              ? "นิสิตจุฬาลงกรณ์มหาวิทยาลัย"
              : `${position} ${organization}`}
          </p>
          {isStudent && <RatingScore averageScore={averageScore} />}
        </div>
      </div>

      {isStudent && portfolioURL && (
        <div
          className="w-full flex p-3 bg-slate-200 text-slate-500 rounded-md hover:bg-slate-400 hover:cursor-pointer hover:shadow-md hover:text-slate-100 mb-[15px] md:mb-[25px]"
          onClick={() =>
            window.open(portfolioURL, "_blank", "noopener,noreferrer")
          }
        >
          <div className="flex gap-3 items-center">
            <Image
              src={"/icons/file.svg"}
              alt={"/icons/file.svg"}
              width={16}
              height={16}
            />
            <p className="text-[14px] font-semibold">{"แฟ้มสะสมผลงาน"}</p>
          </div>
        </div>
      )}

      {description && (
        <div className="pt-[15px] border-t border-[#cbd5e1] mb-[15px]">
          <p className="line-clamp-5 text-[13px] text-[#64748B] md:text-[18px]">
            {description}
          </p>
        </div>
      )}

      {isStudent && (
        <div className="flex items-center justify-center border-t border-[#cbd5e1] pt-[15px] md:pt-[25px]">
          <div className="flex items-center mr-[35px]">
            <Image
              src={"/icons/bag.svg"}
              width={45}
              height={42}
              alt="bag"
              className="mr-[10px]"
            />
            <div className="flex flex-col pt-[5px]">
              <p className="text-[12px] text-[#475569]">รับงานแล้ว</p>
              <p className="text-[16px] text-[#475569] font-bold">
                {workingNumber} งาน
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Image
              src={"/icons/checkHand.svg"}
              width={69}
              height={42}
              alt="check hand"
              className="mr-[10px]"
            />
            <div className="flex flex-col pt-[5px] text-center">
              <p className="text-[12px] text-[#475569]">อัตราสำเร็จ</p>
              <p className="text-[16px] text-[#475569] font-bold">
                {workingComplete} %
              </p>
            </div>
          </div>
        </div>
      )}

      {isEditable && (
        <div
          className="w-full h-[40px] flex items-center justify-center rounded-[6px] border border-1 border-slate-300 cursor-pointer mt-[15px] md:mt-[25px] md:h-[50px]
                hover:opacity-[80%] active:opacity-[60%]"
          onClick={toggleEditProfile}
        >
          <p className="text-[14px] font-medium text-slate-600 md:text-[18px]">
            แก้ไขโปรไฟล์
          </p>
        </div>
      )}
      {isStudent ? (
        <EditStudentProfile
          showEditProfile={showEditProfile}
          toggleEditProfile={toggleEditProfile}
          oldDescription={description ? description : ""}
          session={session}
          studentId={userId}
        />
      ) : (
        <EditEmployerProfile
          showEditProfile={showEditProfile}
          toggleEditProfile={toggleEditProfile}
          prevDescription={description || ""}
          prevOrganization={organization || ""}
          prevPosition={position || ""}
          session={session}
          employerId={userId}
        />
      )}

      {/* <DeleteModal isDisabled={false} deleteAction={null} /> */}
    </div>
  );
}
