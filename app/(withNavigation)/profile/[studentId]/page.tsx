import ProfileInfo from "@/components/profile/ProfileInfo"
import JobsHistoryList from "@/components/profile/JobsHistoryList"
import getJobsByStudentId from "@/actions/application/getJobsByStudentId"
import { getStudentInfoById } from "@/actions/public/getUserInfo"
import { getReviewsByStudentId } from "@/actions/reviews/getReviews"
import getS3URL from "@/actions/public/S3/getS3URL"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

export default async function ProfilePage({ params }: { params: { studentId: string } }) {
  const [allJobsHistory, user, reviews, session] = await Promise.all([
    getJobsByStudentId(params.studentId),
    getStudentInfoById(params.studentId),
    getReviewsByStudentId(params.studentId),
    getServerSession(authOptions),
  ])

  const portfolioURL = user?.student?.resumeName ? await getS3URL(user?.student?.resumeName) : null

  const averageScore = reviews
    ? reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
    : 0
  const success = allJobsHistory.reduce((acc, job) => (job.status === "DONE" ? acc + 1 : acc), 0)
  const successRate = Math.round((success * 100) / allJobsHistory.length)

  return (
    <div className="w-full md:flex md:justify-center md:px-[4px] md:py-[16px]">
      <div className="flex flex-col w-full md:max-w-[500px] md:mr-[30px] lg:mr-[50px]">
        <ProfileInfo
          studentId={params.studentId}
          profileImageURL={user?.profileImageUrl || ""}
          studentName={`${user?.salutation} ${user?.firstname} ${user?.lastname}` || ""}
          averageScore={averageScore || 0}
          portfolioURL={portfolioURL?.data || ""}
          studentDetail={user?.student?.description || ""}
          workingNumber={allJobsHistory.length}
          workingComplete={isNaN(successRate) ? 0 : successRate}
          session={session}
        />
      </div>
      <JobsHistoryList allJobsHistory={allJobsHistory} />
    </div>
  )
}
