import OfferingForm from "@/components/offering/OfferingForm";
import JobDetail from "@/components/offering/JobDetail";

export default async function OfferingPage({
    params,
}: {
    params: { jobId: string };
}) {
    const jobId = params.jobId;

    return (
        <>
            <div className="flex flex-col">
                <div className="font-medium text-slate-800 mb-[10px] lg:text-[20px]">รายละเอียดงาน</div>
                <JobDetail jobId={jobId} isStudentView={true} />
                <OfferingForm />
            </div>
        </>
    );
}
