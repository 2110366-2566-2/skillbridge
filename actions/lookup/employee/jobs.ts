"use server"
import { PrismaClient, JobStatus, ApplicationStatus } from '@prisma/client'


const prisma = new PrismaClient();

export interface job {
    id: string,
    title: string,
    startDate: string,
    endDate: string,
    jobTags: string,
    description: string,
    acceptNum: number,
    maxAcceptNum: number,
    budget: number
}

async function getEmployerJobs(employeeId: string) {
    const output: job[] = [];

    const jobs = await prisma.job.findMany({
        include: {
            jobTag: true,
            applications: true
        },
        where: {
            employerId: {
                equals: employeeId
            }
        }
    });
    
    jobs.forEach((job) => {
        const showJob: job = {
            id: job.id,
            title: job.title,
            startDate: job.estimateStartDate.toLocaleDateString('en-GB'),
            endDate: job.estimateEndDate.toLocaleDateString('en-GB'),
            jobTags: job.jobTag.title, 
            description: job.description,
            acceptNum: job.applications.filter(app => app.status==ApplicationStatus.ACCEPTED).length, //TODO : Filter for accepted application
            maxAcceptNum: job.numWorker,
            budget: job.budget
        };

        output.push(showJob);
    });

    return output;
}

export { getEmployerJobs };