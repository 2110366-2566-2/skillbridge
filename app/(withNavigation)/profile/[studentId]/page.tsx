import ProfileInfo from "@/components/profile/ProfileInfo";
import JobsHistoryList from "@/components/profile/JobsHistoryList";

export default async function ProfilePage({
    params,
}: {
    params: { studentId: string };
}) {


    return (
        <div className="w-full h-full">
            <ProfileInfo
                studentId={params.studentId}
                profileImageURL=""
                studentName="ไอไจ๋มันหล่อ จังฟร่ะ"
                averageScore={4.9}
                portfolioURL="/"
                studentDetail="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                workingNumber="20"
                workingComplete="99.99"
            />
            <JobsHistoryList allJobsHistory={{}} />
        </div>
    );
}
