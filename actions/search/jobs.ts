"use server"
import { PrismaClient, JobStatus, ApplicationStatus } from '@prisma/client'
import { Client } from '@elastic/elasticsearch';
import { match } from 'assert';

const prisma = new PrismaClient();

const elasticClient = new Client({
    node: process.env.ELASTIC_NODE_URL, // Elasticsearch endpoint
    auth: {
        apiKey: { // API key ID and secret
            id: process.env.ELASTIC_API_ID ? process.env.ELASTIC_API_ID : "",
            api_key: process.env.ELASTIC_API_KEY ? process.env.ELASTIC_API_KEY : "",
        }
    }
})

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

export interface jobFilter {
    startDate?: Date,
    endDate?: Date,
    lowestBudget?: number,
    highestBudget?: number,
    jobTag?: string
}

interface elasticJob {
    id: string,
    title: string
}

async function getDefaultSearchJobs(): Promise<job[]> {
    const output: job[] = [];

    const jobs = await prisma.job.findMany({
        include: {
            jobTag: true,
            applications: true
        },
        where: {
            status: {
                equals: JobStatus.NOT_STARTED
            }
        },
        take: 12
    })
    
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
async function getSearchJobs(query?: string, filter?: jobFilter): Promise<job[]> {
    /*
        Filter is yet to be implemented
    */

    /*
    get jobs that match query with title
    steps:
    1. query in elastic search for all the jobs matches
    2. query in psql to get necessarily details
    3. format the data for ease of use in frontend page
    */

    if (query == null) {
        const output: job[] = [];

        let prismaWhereFromFilter = filter ? getPrismaWhereFromJobFilter(filter) : {};


        const jobs = await prisma.job.findMany({
            include: {
                jobTag: true,
                applications: true
            },
            where: {
                status: {
                    equals: JobStatus.NOT_STARTED
                },
                ...prismaWhereFromFilter
            },
            take: 12
        })
        
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
        })

        output.sort((a, b) => {
            const aAcceptRate = a.acceptNum / a.maxAcceptNum;
            const bAcceptRate = b.acceptNum / b.maxAcceptNum;

            return aAcceptRate - bAcceptRate;
        })

        return output;
    }

    /* STEP 1 */ 
    const res = await elasticClient.search<elasticJob>({
        index: "job_1",
        body: {
            "query": {
                match: {
                    title: {
                      query: query,
                      fuzziness: "AUTO"
                    }
                }
            }
        }
    });

    // extract jobId from request
    const resJobId = res.hits.hits.map(e => {
        if (!e._source) return ""
        return e._source.id
    });

    const output: job[] = [];

    let prismaWhereFromFilter = filter ? getPrismaWhereFromJobFilter(filter) : {};


    const jobs = await prisma.job.findMany({
        include: {
            jobTag: true,
            applications: true
        },
        where: {
            status: {
                equals: JobStatus.NOT_STARTED
            },
            id: {
                in: resJobId
            },
            ...prismaWhereFromFilter
        },
        take: 12
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

    output.sort((a, b) => {
        const aAcceptRate = a.acceptNum / a.maxAcceptNum;
        const bAcceptRate = b.acceptNum / b.maxAcceptNum;

        return aAcceptRate - bAcceptRate;
    });

    return output;
}

function getPrismaWhereFromJobFilter(filter: jobFilter) {
    let prismaWhereFilter: any = {};

    if (filter == null) return;

    if (filter.startDate != null) 
        prismaWhereFilter.estimateStartDate = { gte: filter.startDate };

    if (filter.endDate != null) 
        prismaWhereFilter.estimateEndDate = { lte: filter.endDate };

    if (filter.lowestBudget != null) 
        prismaWhereFilter.budget = { gte: filter.lowestBudget };
    
    if (filter.highestBudget != null) 
        if (prismaWhereFilter.budget == null) prismaWhereFilter.budget = {};
        prismaWhereFilter.budget.lte = filter.highestBudget;
    
    if (filter.jobTag != null) {
        prismaWhereFilter.jobTag = { equals: filter.jobTag };
    }

    return prismaWhereFilter;
}


async function main() {
    const filter: jobFilter = {
        lowestBudget: 1000+1,
        highestBudget: 9999
    };

    const a = await getSearchJobs("เขียนโปรแกรม");
    console.log(a);
}

main();



export { getDefaultSearchJobs, getSearchJobs };