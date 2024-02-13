import React from "react";
import getJobById from "@/actions/getJobByID";
import JobForm from "@/components/jobForm/JobForm";
import getJobTags from "@/actions/getJobTags";

export default async function page({ params }: { params: { jobId: string } }) {
  const jobId = params.jobId;
  const jobTags = await getJobTags();
  const job = await getJobById(jobId);
  if(!job) return;
  console.log(job);

  const formData = {
    title: job.title,
    description: (job.description ? (job.description) : ("")) ,
    budget: (job.budget).toString(),
    numWorker: (job.numWorker).toString(),
    estimateStartDate: (job.estimateStartDate).toISOString().split('T')[0],
    estimateEndDate: (job.estimateEndDate).toISOString().split('T')[0],
    jobTagId: job.jobTagId,
  };
  return <JobForm isUpdate={true} jobTags={jobTags} initialData={formData} jobId={jobId} />;
}