"use server"
import { EmailRegisterSchema } from "@/schemas/EmailRegisterSchema"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function registerWithCredentials(data: {
  email: string
  password: string
  cPassword: string
  fname: string
  lname: string
}) {
  console.log(data)

  try {
    const res = EmailRegisterSchema.parse(data)
  } catch (error) {
    console.log(error)
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (exist) {
    console.log("Email already exists")
    return
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)
  console.log(hashedPassword)
  // Extract middlename, salutation
  const user = await prisma.user.create({
    data: {
      salutation: "Mr.",
      firstname: data.fname,
      lastname: data.lname,
      email: data.email,
      hashedPassword: hashedPassword,
    },
  })
  return user
}

export { registerWithCredentials }
