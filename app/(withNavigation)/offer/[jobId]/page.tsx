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
    if (!application) return;
    return (
        <div className="flex justify-center">
            <div className="flex flex-col md:flex-row md:gap-8">
                <div className="flex flex-col">
                    <div className="font-medium text-slate-800 mb-[10px]">
                        รายละเอียดงาน
                    </div>
                    <JobDetail jobId={jobId} isStudentView={true} />
                </div>
                <OfferingForm jobId={jobId} application={application} />
            </div>
        </div>
    );
}
