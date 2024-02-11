"use server"
import { PrismaClient } from '@prisma/client'
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

async function getDefaultSearchJobs(): Promise<job[]> {
    const output: job[] = [];

    const jobs = await prisma.job.findMany({
        include: {
            jobTags: true,
            Applied: true
        },
    })
    
    // TODO : Filter for only jobs that are open
    // Waiting for enum to finalize so it can check
    jobs.forEach((job) => {
        const tags = job.jobTags.map((tag) => String(tag.title));

        const showJob: job = {
            id: job.id,
            title: job.title,
            startDate: job.estimateStartDate.toLocaleDateString('en-GB'),
            endDate: job.estimateEndDate.toLocaleDateString('en-GB'),
            jobTags: "-", // Wait for db schema to change
            description: job.description,
            acceptNum: job.Applied.length, //TODO : Filter for accepted application
            maxAcceptNum: job.numWorker,
            budget: job.budget
        };

        output.push(showJob);
    })

    output.sort((a, b) => {
        const aAcceptRate = a.acceptNum / a.maxAcceptNum;
        const bAcceptRate = b.acceptNum / b.maxAcceptNum;

        return aAcceptRate - bAcceptRate;
    })

    return output;
}
/*
TODO
1. write getSearchJobs without filter functionality
2. add filter functionality
*/
async function getSearchJobs(query: string, filter: any): Promise<job[]> {
    /*
    get jobs that match query with title

    steps:
    1. query in elastic search for all the jobs matches
    2. query in psql to get necessarily details
    3. format the data for ease of use in frontend page
    */
    return [];
}

/*
async function main() {
    const jobs = await getDefaultSearchJobs();

    console.log(jobs);
}

main();
*/

export { getDefaultSearchJobs };