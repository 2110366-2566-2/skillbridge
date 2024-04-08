"use server";

import Image from "next/image";
import noavatar from "@/public/icons/noavatar.svg";
import Link from "next/link";

type Props = {
  employerData: {
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
    organization: string;
    profileImageUrl: string
  };
};

export default async function EmployerDetail({ employerData }: Props) {
  const avatar = employerData.profileImageUrl ? employerData.profileImageUrl : noavatar;

  return (
    <>
      <div className="w-full bg-slate-100 rounded-b-[9.54px] border-slate-300 border-[1px] flex flex-col px-6 py-3 max-w-[600px] md:w-[50vw] lg:w-[45vw]">
        <div className="font-semibold text-[14px] text-slate-800 lg:text-[16px]">
          ผู้ว่าจ้าง
        </div>
        <div className="flex flex-row mt-2">
          <Image
            className="rounded-full translate-x-1"
            src={avatar}
            alt="avatar"
            width={40}
            height={40}
            style={{
              objectFit: 'cover',
            }}
          />
          <Link className="flex flex-col ml-5 lg:ml-6 cursor-pointer hover:underline"
            href={`/profile/`}
          >
            <div className="font-medium text-[14px] text-slate-800 lg:text-[16px]">
              {employerData.firstName} {employerData.middleName}{" "}
              {employerData.lastName}
            </div>
            <div className="text-[11px] text-slate-800 line-clamp-1 lg:text-[13px]">
              {employerData.position} {employerData.organization}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
