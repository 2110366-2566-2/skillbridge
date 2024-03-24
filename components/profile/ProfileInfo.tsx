import Image from "next/image"
import RatingScore from "./subProfile/RatingScore"
import Link from "next/link"
import { Session } from "next-auth"

export default function ProfileInfo({
  studentId,
  profileImageURL,
  studentName,
  averageScore,
  portfolioURL,
  studentDetail,
  workingNumber,
  workingComplete,
  session,
}: {
  studentId: string
  profileImageURL: string
  studentName: string
  averageScore: number
  portfolioURL: string
  studentDetail: string
  workingNumber: number
  workingComplete: number
  session: Session | null
}) {

  const isEditAble = session?.user?.id === studentId

  return (
    <div className="p-[20px] border border-1 border-[#cbd5e1] rounded-md md:px-[25px] md:py-[30px]">
      <div className="flex items-center mb-[15px] md:mb-[25px]">
        <div className="mr-[15px] md:mr-[20px] w-[94px] h-[94px] lg:w-[130px] lg:h-[130px] rounded-full border border-[#778499] overflow-hidden">
          <Image
            src={profileImageURL ? profileImageURL : "/images/defaultProfile.svg"}
            width={0}
            height={0}
            alt="profile"
            className="w-[110px] h-[110px] lg:w-[146px] lg:h-[146px] object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-[21px] text-[#334155] line-clamp-1 lg:text-[28px]">
            {studentName}
          </p>

          <p className="text-[13px] text-slate-600 mb-[7px] md:text-[14px] lg:text-[17px] lg:mb-[4px]">
            นิสิตจุฬาลงกรณ์มหาวิทยาลัย
          </p>

          <RatingScore averageScore={averageScore} />
        </div>
      </div>

      {portfolioURL && (
        <Link href={portfolioURL}>
          <div className="w-full px-[16px] flex items-center pb-[8px] pt-[10px] bg-[#cbd5e1] rounded-lg hover:underline hover:underline-offset-2 cursor-pointer mb-[15px] md:mb-[25px]">
            <Image
              src={"/icons/file.svg"}
              width={0}
              height={0}
              alt="file"
              className="w-[15px] h-[15px] md:w-[20px] md:h-[20px] mr-[15px]"
            />
            <p className="text-[16px] font-medium text-slate-600 text-center md:text-[20px]">
              แฟ้มสะสมผลงาน
            </p>
          </div>
        </Link>
      )}

      {studentDetail && (
        <div className="pt-[15px] border-t border-[#cbd5e1] mb-[15px]">
          <p className="line-clamp-5 text-[13px] text-[#64748B] md:text-[18px]">{studentDetail}</p>
        </div>
      )}

      <div className="flex items-center justify-center border-t border-[#cbd5e1] pt-[15px] md:pt-[25px]">
        <div className="flex items-center mr-[35px]">
          <Image src={"/icons/bag.svg"} width={45} height={42} alt="bag" className="mr-[10px]" />
          <div className="flex flex-col pt-[5px]">
            <p className="text-[12px] text-[#475569]">รับงานแล้ว</p>
            <p className="text-[16px] text-[#475569] font-bold">{workingNumber} คน</p>
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
            <p className="text-[16px] text-[#475569] font-bold">{workingComplete} %</p>
          </div>
        </div>
      </div>

      {isEditAble && (
        <div
          className="w-full h-[40px] flex items-center justify-center rounded-[6px] border border-1 border-slate-300 cursor-pointer mt-[15px] md:mt-[25px] md:h-[50px]
                hover:opacity-[80%] active:opacity-[60%]">
          <p className="text-[14px] font-medium text-slate-600 md:text-[18px]">แก้ไขโปรไฟล์</p>
        </div>
      )
      }
    </div >
  )
}
