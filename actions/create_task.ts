"use server";

import prisma from "@/db/prisma";
//import {getServerSession} from "next-auth";
//import {options} from "../api/auth/[...nextaut]/options"

const createJob = async (fromData: FormData) => {
  try {
    const title = fromData.get("title");
    const status = fromData.get("status");
    const description = fromData.get("description");
    const startDate = fromData.get("startDate");
    const endDate = fromData.get("endDate");
    const estimateStartDate = fromData.get("estimateStartDate");
    const estimateEndDate = fromData.get("estimateEndDate");
    const budget = fromData.get("budget");
    const numWorker = fromData.get("NumWorker");

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

    // await prisma.job.create({
    //   data: {
    //     userId: userId,
    //     title: title,
    //     status: status,
    //     description: description,
    //     startDate: startDate,
    //     endDate: endDate,
    //     estimateStartDate: estimateStartDate,
    //     estimateEndDate: estimateEndDate,
    //     budget: budget,
    //     numWorker: numWorker,
    //   },
    // });

    // return {
    //   message: "Create Task Success",
    //   status: 200,
    // };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};
