import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./navbar/Navbar";
import SearchAndFilter from "./searchAndFilter/SearchAndFilter";
import TaskHeader from "./jobHeader/JobHeader";
import CreateJobHeader from "./createJobHeader/CreateJobHeader";
import UpdateJobHeader from "./updateJobHeader/UpdateJobHeader";
import LandingHeader from "./landingHeader/LandingHeader";
import PaymentHeader from "./paymentHeader/PaymentHeader";
import OfferingHeader from "./offeringHeader/OfferingHeader";
import PaymentHistoryHeader from "./paymentHistoryHeader/PaymentHistoryHeader";
import getJobTags from "@/actions/jobs/getJobTags";
import whiteLogo from "@/public/logos/logo-white.svg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getEmployerInfoById } from "@/actions/public/getUserInfo";
import ProgressHeader from "./progressHeader/ProgressHeader";
import ProfileHeader from "./profileHeader/ProfileHeader";
import getProfileImage from "@/actions/profile/getProfileImage";

export default async function Header() {
  // Fetch Job tags
  const jobTags = await getJobTags();

  // Sesion with info
  const session = await getServerSession(authOptions);
  let profileImage;
  if (session) {
    profileImage = await getProfileImage(session?.user.id);
  }

  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
  let userInfo = "นิสิตจุฬาลงกรณ์มหาวิทยาลัย";
  if (session && !isStudent) {
    const employerInfo = await getEmployerInfoById(session?.user.id);
    userInfo =
      employerInfo?.employer?.position +
      " " +
      employerInfo?.employer?.organization;
  }

  return (
    <div>
      <div>
        <div className="flex justify-between items-center py-5 pl-5 pr-3 md:pr-5">
          <Link href="/landing">
            <Image
              className="w-auto h-auto md:w-36 md:hover:scale-105 md:duration-500 active:opacity-40"
              src={whiteLogo}
              alt="logo"
              width={110}
              height={110}
              priority={true}
            />
          </Link>
          {/* Desktop */}
          <div className="hidden lg:inline-block">
            {/* Only shows at "/search" */}
            <SearchAndFilter />
          </div>
          <Navbar
            session={session}
            isStudent={isStudent}
            userInfo={userInfo}
            profileImage={profileImage}
          />
        </div>
        <LandingHeader isStudent={isStudent} jobTags={jobTags} />
        <CreateJobHeader />
        <UpdateJobHeader />
        <PaymentHistoryHeader />
        <OfferingHeader />
      </div>
      {/* Mobile and Tablet */}
      <div className="lg:hidden">
        {/* Only shows at "/search" */}
        <SearchAndFilter />
      </div>
      {/* Only shows at "/jobs" */}
      <TaskHeader />
      {/* Only shows at "/jobs/:jobId/payment/:studentId" */}
      <PaymentHeader />
      {/* Only shows at "/progress/:Jid/:Sid" */}
      <ProgressHeader />
      {/* Only shows at "/profile/studentId" */}
      <ProfileHeader />
    </div>
  );
}
