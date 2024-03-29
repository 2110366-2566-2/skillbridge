"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

async function getUserId() {
    const session: any = await getServerSession(authOptions)
    const userId = session?.user.id
    return userId
}

export default getUserId