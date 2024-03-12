"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

const isSent = async (jobId: string) => {
  const session: any = await getServerSession(authOptions);
  const result: any = prisma.application.findFirst({
    where: {
      jobId: jobId,
      userId: session.user.id,
    },
  });

  if (result) {
    return true;
  }
  return false;
};

export default isSent;
