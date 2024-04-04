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
import { getNameFromSession } from "@/lib/extractNameFromSession";

export default async function ProfilePage({ params }: { params: { userId: string } }) {
  // Declare variables
  let allJobsHistory = [];
  let user, userName, reviews, profileImage, portfolio, averageScore, successRate;

  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";

  // Fetch student's profile data
  if (isStudent) {
    [allJobsHistory, user, reviews] = await Promise.all([
      getJobsByStudentId(params.userId),
      getStudentInfoById(params.userId),
      getReviewsByStudentId(params.userId),
    ]);
    portfolio = user?.student?.resumeName? await getS3URL(user?.student?.resumeName) : null;
    averageScore = reviews
      ? reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
      : 0;
    const success = allJobsHistory.reduce((acc, job) => (job.status === "DONE" ? acc + 1 : acc), 0);
    successRate = Math.round((success * 100) / allJobsHistory.length) || 0;

  } else {
    // Fetch employer's profile data
    [allJobsHistory, user] = await Promise.all([
      getEmployerJobs(),
      getEmployerInfoById(params.userId),
    ]);
  }

  // Common profile data
  userName = getNameFromSession(session);
  if(session?.user.profileImageUrl) {
    const res = await getS3URL(session.user.profileImageUrl);
    profileImage = (res.success) ? (res.data) : ("");
  } profileImage = "";
  
  return (
    <div className="w-full md:flex md:justify-center md:px-[4px] md:py-[16px]">
      <div className="flex flex-col w-full md:max-w-[500px] md:mr-[30px] lg:mr-[50px]">
        <ProfileInfo
          userId={params.userId}
          profileImageURL={profileImage}
          userName={userName}
          averageScore={averageScore || 0}
          portfolioURL={portfolio?.data || ""}
          description={}
          workingNumber={allJobsHistory.length}
          workingComplete={successRate}
          isStudent={isStudent}
          session={session}
          employerInfo={}
        />
      </div>
      <JobsHistoryList allJobsHistory={allJobsHistory} userId={params.userId} isStudent={isStudent} />
    </div>
  );
}
