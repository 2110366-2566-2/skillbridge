import OfferingForm from "@/components/offering/OfferingForm";
import JobDetail from "@/components/offering/JobDetail";
import getApplicationByUserId from "@/actions/application/getApplicationByUserId";

export default async function OfferingPage({
    params,
}: {
    params: { jobId: string };
}) {
    const jobId = params.jobId;

    const application = await getApplicationByUserId(jobId);
    console.log("ping: ", application)

    return (
        <>
            <div className="flex flex-col">
                <div className="font-medium text-slate-800 mb-[10px] lg:text-[20px]">รายละเอียดงาน</div>
                <JobDetail jobId={jobId} isStudentView={true} />
                <OfferingForm jobId={jobId} />
            </div>
        </>
    );
}
