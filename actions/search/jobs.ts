"use server"
import { PrismaClient, JobStatus, ApplicationStatus } from '@prisma/client'
import { Client } from '@elastic/elasticsearch';
import { match } from 'assert';

const prisma = new PrismaClient();

const elasticClient = new Client({
    node: 'https://b426ab52dd164499ada636cb8d8b3af9.us-central1.gcp.cloud.es.io/', // Elasticsearch endpoint
    auth: {
        apiKey: { // API key ID and secret
            id: 'eTxAhY0BhLRr9VLOzDKR',
            api_key: 'TyOSbYw1RU6uTx81--qp4A',
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

interface elasticJob {
    id: string,
    title: string
}

async function getDefaultSearchJobs(): Promise<job[]> {
    const output: job[] = [];

    const jobs = await prisma.job.findMany({
        include: {
            jobTag: true,
            Application: true
        },
        where: {
            status: {
                equals: JobStatus.NOT_STARTED
            }
        },
        take: 15
    })
    
    jobs.forEach((job) => {
        const showJob: job = {
            id: job.id,
            title: job.title,
            startDate: job.estimateStartDate.toLocaleDateString('en-GB'),
            endDate: job.estimateEndDate.toLocaleDateString('en-GB'),
            jobTags: job.jobTag.title, 
            description: job.description,
            acceptNum: job.Application.filter(app => app.status==ApplicationStatus.ACCEPTED).length, //TODO : Filter for accepted application
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
async function getSearchJobs(query: string): Promise<job[]> {
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
    })

    // extract jobId from request
    const resJobId = res.hits.hits.map(e => {
        if (!e._source) return ""
        return e._source.id
    });

    const output: job[] = [];

    const jobs = await prisma.job.findMany({
        include: {
            jobTag: true,
            Application: true
        },
        where: {
            status: {
                equals: JobStatus.NOT_STARTED
            },
            id: {
                in: resJobId
            }
        },
        take: 15
    })
    
    jobs.forEach((job) => {
        const showJob: job = {
            id: job.id,
            title: job.title,
            startDate: job.estimateStartDate.toLocaleDateString('en-GB'),
            endDate: job.estimateEndDate.toLocaleDateString('en-GB'),
            jobTags: job.jobTag.title, 
            description: job.description,
            acceptNum: job.Application.filter(app => app.status==ApplicationStatus.ACCEPTED).length, //TODO : Filter for accepted application
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


// async function main() {
//     const a = await getSearchJobs("เขียนโปรแกรม");
//     console.log(a);
// }

// main();


export { getDefaultSearchJobs };