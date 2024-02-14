"use client"
import { useSearchParams } from "next/navigation"
import EmployerRegister from "./EmployerRegister"
import StudentRegister from "./StudentRegister"
import { useState } from "react"

export default function Register() {
  const isStudent = useSearchParams().get("isStudent") === "true" || false
  const [isEmployerPage, setIsEmployerPage] = useState(!isStudent)

  const handleEmployerPage = () => {
    setIsEmployerPage(true)
  }

  const handleNisitPage = () => {
    setIsEmployerPage(false)
  }

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

      {isEmployerPage ? <EmployerRegister /> : <StudentRegister />}
    </div>
  )
}
