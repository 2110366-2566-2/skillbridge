import React from "react";
import JobForm from "@/components/jobForm/JobForm";
import getJobTags from "@/actions/getJobTags";

export default async function page() {
  const jobTags = await getJobTags();
  return <JobForm isUpdate={false} jobTags={jobTags} />;
}
