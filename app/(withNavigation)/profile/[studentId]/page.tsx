import ProfileInfo from "@/components/profile/ProfileInfo"
import JobsHistoryList from "@/components/profile/JobsHistoryList"
import getJobsByStudentId from "@/actions/application/getJobsByStudentId"
import { getStudentInfoById } from "@/actions/public/getUserInfo"
import { getReviewsByStudentId } from "@/actions/reviews/getReviews"

export default async function ProfilePage({ params }: { params: { studentId: string } }) {
  const [allJobsHistory, user, reviews] = await Promise.all([
    getJobsByStudentId(params.studentId),
    getStudentInfoById(params.studentId),
    getReviewsByStudentId(params.studentId),
  ])
  const averageScore = reviews
    ? reviews.reduce((acc, review) => acc + review.stars, 0) / reviews.length
    : 0
  const success = allJobsHistory.reduce((acc, job) => (job.status === "DONE" ? acc + 1 : acc), 0)

  return (
    <div className="w-full md:flex md:justify-center md:px-[4px] md:py-[16px]">
      <div className="flex flex-col w-full md:max-w-[500px] md:mr-[30px] lg:mr-[50px]">
        <ProfileInfo
          studentId={params.studentId}
          profileImageURL={user?.profileImageUrl || ""}
          studentName={`${user?.salutation} ${user?.firstname} ${user?.lastname}` || ""}
          averageScore={averageScore || 0}
          portfolioURL={user?.student?.resumeName || ""}
          studentDetail={user?.student?.description || ""}
          workingNumber={allJobsHistory.length}
          workingComplete={Math.round((success * 100) / allJobsHistory.length)}
        />
      </div>
      <JobsHistoryList allJobsHistory={allJobsHistory} />
    </div>
  )
}
