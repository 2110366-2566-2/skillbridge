import React from "react";
import { getDefaultSearchJobs } from "@/actions/tasks";

// import { getJobTags } from "@/actions/jobTags";

export default function SearchPage() {
  const jobs = getDefaultSearchJobs();
  // const jobTags = getJobTags();
  console.log(jobs);
  // console.log(jobTags)



  return <div>This is search page</div>;
}
