import React from "react";
import { getDefaultSearchJobs } from "@/actions/tasks";

export default function SearchPage() {
  const jobs = getDefaultSearchJobs();
  console.log(jobs);

  return <div>This is search page</div>;
}
