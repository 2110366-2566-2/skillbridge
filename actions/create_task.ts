"use server"

import { PrismaClient } from "@prisma/client"
import prisma from "@/db/prisma"

const createJob = async (fromData: FormData) => {
  const title = fromData.get('title')
  const status = fromData.get('status')
  const description = fromData.get('description')
  const startDate = fromData.get('startDate')
  const endDate = fromData.get('endDate')
  const estimateStartDate = fromData.get('estimateStartDate')
  const estimateEndDate = fromData.get('estimateEndDate')
}

