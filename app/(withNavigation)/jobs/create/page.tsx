import React from "react";
import JobForm from "@/components/createAndUpdateJob/jobForm/JobForm";
import getJobTags from "@/actions/jobs/getJobTags";

export default async function CreateJobPage() {
  const jobTags = await getJobTags();
  const formData = {
    title: "",
    description: "",
    budget: "",
    numWorker: "",
    estimateStartDate: "",
    estimateEndDate: "",
    jobTagId: "",
  };
  return (
    <JobForm
      isUpdate={false}
      jobTags={jobTags}
      initialData={formData}
      jobId={""}
    />
  );
}
