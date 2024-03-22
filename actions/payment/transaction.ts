"use server";

import uploadFileToS3 from "../public/S3/uploadFileToS3";
import { prisma } from "../../lib/prisma";
import { TransactionStatus } from "@prisma/client";
import {
  depositPendingToInProgress,
  wagePaymentPendingToDone,
} from "../jobs/jobCards/employerChangeApplicationState";

const createTransaction = async (formData: FormData) => {
  const jobId = formData.get("jobId") as string;
  const studentId = formData.get("studentId") as string;
  const employerUserId = formData.get("employerUserId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const isDeposit = formData.get("isDeposit") === "true";
  const receipt = formData.get("receipt") as File;
  try {
    const buffer = await receipt.arrayBuffer();
    const byteArray = new Uint8Array(buffer);
    console.log("receipt", receipt);

    const receiptImageName = await uploadFileToS3(
      byteArray,
      receipt.type,
      receipt.size,
      "transactionFiles",
      receipt.name
    );
    console.log("receiptImageName", receiptImageName);
    if (typeof receiptImageName !== "string")
      throw new Error("Error in uploading receipt");

    const newTransaction = await prisma.transaction.create({
      data: {
        jobId,
        studentId,
        employerUserId,
        amount,
        receiptImageName,
        isDeposit,
      },
    });
    // Validate receipt
    const results = await Promise.all([
      prisma.transaction.update({
        where: {
          id: newTransaction.id,
        },
        data: {
          status: TransactionStatus.ACCEPTED,
        },
      }),
      isDeposit
        ? depositPendingToInProgress(studentId, jobId)
        : wagePaymentPendingToDone(studentId, jobId),
      // if pay wage, transfer money to student
    ]);

    return results;
  } catch (error) {
    console.error("Error in createTransaction:", error);
    return null;
  }
};

export default createTransaction;
