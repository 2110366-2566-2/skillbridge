"use client"
import EmployerRegister from "./EmployerRegister"
import StudentRegister from "./StudentRegister"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Register() {
  const { data: session } = useSession()
  const [isEmployerPage, setIsEmployerPage] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const handleEmployerPage = () => {
    setIsEmployerPage(true)
  }

  const handleNisitPage = () => {
    setIsEmployerPage(false)
  }

  useEffect(() => {
    if (session?.user) {
      if (session.user.hashedPassword === "incomplete") {
        setIsLoggedIn(true)
        setIsEmployerPage(session.email.split("@")[1] !== "student.chula.ac.th")
      } else {
        router.push("/landing")
      }
    }
  }, [session])

  return (
    <div className="flex flex-col items-center w-[305px] mt-[25px] ">
      <div className="w-full bg-[#CBD5E1] h-[50px] rounded-md p-[6px] flex items-center">
        <button
          style={{ backgroundColor: isEmployerPage ? "white" : "#CBD5E1" }}
          className="w-1/2 h-full flex items-center justify-center rounded-md"
          onClick={handleEmployerPage}>
          <p className="text-sm">สำหรับผู้ว่าจ้าง</p>
        </button>
        <button
          style={{ backgroundColor: isEmployerPage ? "#CBD5E1" : "white" }}
          className="w-1/2 h-full flex items-center justify-center rounded-md"
          onClick={handleNisitPage}>
          <p className="text-sm">สำหรับนิสิต</p>
        </button>
      </div>

      {isEmployerPage ? (
        <EmployerRegister isLoggedIn={isLoggedIn} />
      ) : (
        <StudentRegister isLoggedIn={isLoggedIn} />
      )}
    </div>
  )
}
