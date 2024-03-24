import React from "react";
import { redirect } from "next/navigation";
import CloseJobButton from "@/components/jobManage/CloseJobButton";
import JobDetail from "@/components/offering/JobDetail";
import getJobById from "@/actions/jobs/getJobByID";
import JobManagePanel from "@/components/jobManage/JobManagePanel";

type Props = {
  params: {
    jobId: string;
  };
};

async function ManagePage({ params }: Props) {
  const jobId = params.jobId;

  const jobData = (await getJobById(jobId)) || {};
  if (jobData == null) {
    redirect("/jobs");
  }

  return (
    <main className="flex flex-col px-10 gap-10">
      <section className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <p className="font-bold text-2xl line-clamp-2 flex items-center">
            {jobData?.title}
          </p>
          <div className="bg-slate-200 rounded-sm p-2 w-fit">
            {jobData?.jobTags}
          </div>
        </div>
        <CloseJobButton jobId={jobId} jobName={jobData?.title}>
          ปิดรับสมัคร
        </CloseJobButton>
      </section>

      <section className="flex lg:flex-row gap-8 flex-col justify-around">
        <article className="mx-auto">
          {/* job detail */}
          <JobDetail jobId={jobId} isStudentView={false} />
        </article>

        <JobManagePanel jobId={jobId} />
      </section>
    </main>
  );
}

export default ManagePage;
