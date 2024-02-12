"use server";

import prisma from "@/db/prisma";
//import {getServerSession} from "next-auth";
//import {options} from "../api/auth/[...nextaut]/options"

interface FormData {
  title: string;
  description: string;
  budget: string;
  numWorker: string;
  estimateStartDate: string;
  estimateEndDate: string;
  jobTag: string;
  files: FileList | null;
}

const createJob = async (formData: FormData) => {
  try {
    const title = formData.title;
    const status = "NOT_STARTED"; //ไม่น่าใช่ input จาก user เราคง้องกำหนดเอง
    const description = formData.description;
    const estimateStartDate = formData.estimateStartDate;
    const estimateEndDate = formData.estimateEndDate;
    const budget = formData.budget;
    const jobTag = formData.jobTag;
    const numWorker = formData.numWorker;
    const files = formData.files;
    console.log(title, status, description, estimateStartDate, estimateEndDate, budget, jobTag, numWorker, files);
    // const startDate = fromData.get("startDate"); --> อันนี้ไม่รู้ว่ามาจากไหนอะ งอง55
    // const endDate = fromData.get("endDate"); --> อันนี้ไม่รู้ว่ามาจากไหนอะ งอง55 

    //const session = await getServerSession(options);
    //const userId = session?.userId
    // const employer = await prisma.employer.findFirst({
    //   where:{ userId: userId},
    //   select:{userId:true}
    // })

    // if (!session || !employer){
    //   throw {
    //     message: "Authentication fail",
    //     status: 401
    //   }
    // }

    // const job = {
    //   userId: userId,
    //   title: title,
    //   status: status,
    //   description: description,
    //   startDate: startDate,
    //   endDate: endDate,
    //   estimateStartDate: estimateStartDate,
    //   estimateEndDate: estimateEndDate,
    //   budget: budget,
    //   numWorker: numWorker,
    // } as JobInput

    // await prisma.job.create({
    //   data: {
    //     job
    //   },
    // });

    // return {
    //   message: "Create Task Success",
    //   status: 201,
    // };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export default createJob;