"use server"

import { prisma } from "@/lib/prisma"

const getUniqueEmail = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  return result
}

export default getUniqueEmail
