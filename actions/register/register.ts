"use server"

import { prisma } from "@/lib/prisma"
import { splitSalutation } from "@/lib/utils"
import { EmailRegisterSchema } from "@/schemas/EmailRegisterSchema"
import bcrypt from "bcrypt"

export async function registerWithCredentials(data: {
  email: string
  password: string
  cPassword: string
  fname: string
  lname: string
}) {
  try {
    const res = EmailRegisterSchema.parse(data)
  } catch (error) {
    console.log(error)
    return null
  }

  const exist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (exist) {
    console.log("Email already exists")
    return null
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const [salutation, firstname] = splitSalutation(data.fname)
  const lname = data.lname.split(/\s+/)

  const employer = await prisma.employer.create({
    data: {
      position: "-",
      organization: "-",
      publicEmail: data.email,
      user: {
        create: {
          salutation,
          firstname,
          lastname: lname.pop() || data.lname,
          middlename: lname.join(" ") || "",
          hashedPassword: hashedPassword,
          email: data.email,
        },
      },
    },
  })
  return employer
}

export async function updateName(email: string, fname: string, lname: string) {
  const [salutation, firstname] = splitSalutation(fname)
  const lnameArr = lname.split(/\s+/)

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      salutation,
      firstname,
      lastname: lnameArr.pop() || lname,
      middlename: lnameArr.join(" ") || "",
      hashedPassword: "completed",
    },
  })
  return user
}
