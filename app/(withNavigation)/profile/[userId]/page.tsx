import ProfileInfo from "@/components/profile/ProfileInfo";
import JobsHistoryList from "@/components/profile/JobsHistoryList";
import getJobsByStudentId from "@/actions/application/getJobsByStudentId";
import getJobsByEmployerId from "@/actions/profile/getJobsByEmployerId";
import getS3URL from "@/actions/public/S3/getS3URL";
import getProfileImage from "@/actions/profile/getProfileImage";
import getIsStudent from "@/actions/profile/isStudent";
import { getStudentInfoById } from "@/actions/public/getUserInfo";
import { getEmployerInfoById } from "@/actions/public/getUserInfo";
import { getReviewsByStudentId } from "@/actions/reviews/getReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { transformEmployerJobs } from "@/lib/profile/employerJobAdapter";
import { transformStudentJobs } from "@/lib/profile/studentJobAdapter";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  // Declare variables
  let allJobsHistory = [];
  let fullName, profileImage, description; // common
  let studentInfo, reviews, portfolio, averageScore, successRate; // for student
  let employerInfo, organization, position; // for employer

  // Session
  const session = await getServerSession(authOptions);
  const isStudent = await getIsStudent(params.userId);

  // Fetch profile Image
  profileImage = await getProfileImage(params.userId);

  // Fetch student's profile data
  if (isStudent) {
    [allJobsHistory, studentInfo, reviews] = await Promise.all([
      getJobsByStudentId(params.userId),
      getStudentInfoById(params.userId),
      getReviewsByStudentId(params.userId),
    ]);
    allJobsHistory = transformStudentJobs(allJobsHistory);
    portfolio = studentInfo?.student?.resumeName
      ? await getS3URL(studentInfo?.student?.resumeName)
      : null;
    averageScore = reviews
      ? Math.round(
          (reviews.reduce((acc, review) => acc + review.stars, 0) * 10) /
            reviews.length
        ) / 10
      : 0;
    const success = allJobsHistory.reduce(
      (acc, job) => (job.status === "DONE" ? acc + 1 : acc),
      0
    );
    successRate = Math.round((success * 100) / allJobsHistory.length) || 0;
    description = studentInfo?.description;
    fullName = studentInfo?.middlename
      ? `${studentInfo?.firstname} ${studentInfo?.middlename} ${studentInfo?.lastname}`
      : `${studentInfo?.firstname} ${studentInfo?.lastname}`;
  } else {
    // Fetch employer's profile data
    [allJobsHistory, employerInfo] = await Promise.all([
      getJobsByEmployerId(params.userId),
      getEmployerInfoById(params.userId),
    ]);
    allJobsHistory = transformEmployerJobs(allJobsHistory);
    organization = employerInfo?.employer?.organization;
    position = employerInfo?.employer?.position;
    description = employerInfo?.description;
    fullName = employerInfo?.middlename
      ? `${employerInfo?.firstname} ${employerInfo?.middlename} ${employerInfo?.lastname}`
      : `${employerInfo?.firstname} ${employerInfo?.lastname}`;
  }

  return (
    <div className="w-full md:flex md:justify-center md:px-[4px] md:py-[16px]">
      <div className="flex flex-col w-full md:max-w-[500px] md:mr-[30px] lg:mr-[50px]">
        <ProfileInfo
          userId={params.userId}
          session={session}
          isStudent={isStudent}
          fullName={fullName}
          profileImageURL={profileImage}
          description={description || ""}
          averageScore={averageScore || 0}
          portfolioURL={portfolio?.data || ""}
          workingNumber={allJobsHistory.length || 0}
          workingComplete={successRate || 0}
          organization={organization || ""}
          position={position || ""}
        />
      </div>
      <JobsHistoryList
        userId={params.userId}
        isStudent={isStudent}
        allJobsHistory={allJobsHistory}
      />
    </div>
  );
}
