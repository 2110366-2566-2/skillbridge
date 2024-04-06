import { JobsByStudent } from "@/actions/application/getJobsByStudentId";

export interface AllJobsHistory {
    jobId: string;
    title: string;
    estimateStartDate: Date;
    estimateEndDate: Date;
    jobTag: string;
    status: string;
}

export function transformStudentJobs(jobs: JobsByStudent[]): AllJobsHistory[] {
    return jobs.map((job) => ({
        jobId: job.jobId,
        title: job.job.title,
        estimateStartDate: job.job.estimateStartDate,
        estimateEndDate: job.job.estimateEndDate,
        jobTag: job.job.jobTag.title,
        status: job.status
    }));
}
