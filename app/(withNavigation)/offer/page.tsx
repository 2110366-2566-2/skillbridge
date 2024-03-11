import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import OfferingForm from "@/components/offering/OfferingForm";
import JobDetail from "@/components/offering/JobDetail";

export default async function OfferingPage() {
    // const {data : session} = useSession();

    // console.log("------------------------------------------------------------")
    const session = await getServerSession(authOptions); //Server

    // console.log("session : \n", session);
    if (!session) {
        // console.log(".\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n")
        redirect("/login");
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="font-medium text-slate-800 mb-[10px] lg:text-[20px]">รายละเอียดงาน</div>
                <JobDetail />
                <OfferingForm />
            </div>
        </>
    );
}
