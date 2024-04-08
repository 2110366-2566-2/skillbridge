"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

async function getIsStudent() {
    const session: any = await getServerSession(authOptions)
    const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
    return isStudent
}

export default getIsStudent