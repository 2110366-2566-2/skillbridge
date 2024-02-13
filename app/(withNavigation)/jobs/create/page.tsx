import React from "react";
import JobForm from "@/components/jobForm/JobForm";
import getJobTags from "@/actions/getJobTags";

export default async function page() {
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
