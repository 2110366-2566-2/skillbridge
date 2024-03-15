"use client"

import { usePathname } from "next/navigation"
import React from "react"

type Props = {}

const JobHeader = (props: Props) => {
  const pathName = usePathname()
  const isJobPage = pathName === "/jobs";
  const isStudentJobPage = pathName === "/studentjobs";
  const isNotPaymentPage = !pathName.includes("/payment")

  return (
    <>
      {isNotPaymentPage && (isJobPage || isStudentJobPage) && (
        <div className="font-semibold text-[30px] text-white ml-5 mb-4">งานของฉัน</div>
      )}
    </>
  )
}

export default JobHeader
