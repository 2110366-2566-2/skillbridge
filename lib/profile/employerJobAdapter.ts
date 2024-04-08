import { job } from "@/actions/jobs/getEmployerJobs";
import { AllJobsHistory } from "./studentJobAdapter";

export function transformEmployerJobs(inputJobs: job[]): AllJobsHistory[] {
  return inputJobs
    .filter(job => !job.isDeleted) // Filter out jobs where isDeleted is true
    .map(job => ({
      jobId: job.id,
      title: job.title,
      estimateStartDate: job.startDate,
      estimateEndDate: job.endDate,
      jobTag: job.jobTags,
      status: job.jobStatus
    }));
}
