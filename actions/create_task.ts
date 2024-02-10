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
    // const employer = await prisma.employer.findFirst({
    //   where:{ userId: session?.userId},
    //   select:{userId:true}
    // })

    // if (!session || !employer){
    //   throw {
    //     message: "Authentication fail",
    //     status: 401
    //   }
    // }
  } catch (error) {
    console.log(error);
    return { message: "Internal Server Error", status: 500 };
  }
};
