import ProfileInfo from "@/components/profile/ProfileInfo";
import JobsHistoryList from "@/components/profile/JobsHistoryList";
import getJobsByStudentId from "@/actions/application/getJobsByStudentId";
import { getStudentInfoById } from "@/actions/public/getUserInfo";
import { getEmployerInfoById } from "@/actions/public/getUserInfo";
import { getEmployerJobs } from "@/actions/jobs/getEmployerJobs";
import { getReviewsByStudentId } from "@/actions/reviews/getReviews";
import getS3URL from "@/actions/public/S3/getS3URL";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getNameFromSession } from "@/lib/profile/extractNameFromSession";
import { transformEmployerJobs } from "@/lib/profile/employerJobAdapter";
import { transformStudentJobs } from "@/lib/profile/studentJobAdapter";
import getProfileImage from "@/actions/profile/getProfileImage";

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  // Declare variables
  let allJobsHistory = [];
  let fullName ,profileImage; // common
  let student, reviews, portfolio, averageScore, successRate; // for student
  let employer, organization, position; // for employer

  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";

  // Fetch common profile data
  fullName = getNameFromSession(session);
  profileImage = await getProfileImage(params.userId);

  // Fetch student's profile data
  if (isStudent) {
    [allJobsHistory, student, reviews] = await Promise.all([
      getJobsByStudentId(params.userId),
      getStudentInfoById(params.userId),
      getReviewsByStudentId(params.userId),
    ]);
    allJobsHistory = transformStudentJobs(allJobsHistory);
    portfolio = student?.resumeName? await getS3URL(student?.resumeName) : null;
    averageScore = reviews
      ? reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
      : 0;
    const success = allJobsHistory.reduce((acc, job) => (job.status === "DONE" ? acc + 1 : acc), 0);
    successRate = Math.round((success * 100) / allJobsHistory.length) || 0;

  } else {
    // Fetch employer's profile data
    [allJobsHistory, employer] = await Promise.all([
      getEmployerJobs(),
      getEmployerInfoById(params.userId),
    ]);
    allJobsHistory = transformEmployerJobs(allJobsHistory);
    organization = employer?.organization;
    position = employer?.position;
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
          description={"description"}
          averageScore={averageScore || 0}
          portfolioURL={portfolio?.data || ""}
          workingNumber={allJobsHistory.length}
          workingComplete={successRate}
          organization={organization}
          position={position}
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
