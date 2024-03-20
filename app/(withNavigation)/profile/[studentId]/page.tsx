import ProfileInfo from "@/components/profile/ProfileInfo";

export default async function ProfilePage({
    params,
}: {
    params: { studentId: string };
}) {

    return (
        <div className="w-full h-full">
            <ProfileInfo profileImageURL="" studentName="ไอไจ๋มันหล่อ จังฟร่ะ" averageScore={4.9} />
        </div>
    );
}
