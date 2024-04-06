import React from "react";
import JobsMenu from "@/components/jobs/employerJobs/JobsMenu";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function WorkPage() {
  const session = await getServerSession();
  if(!session)
  {
    redirect("/login");
  }
  return (
    <div className="px-10">
      <JobsMenu />
    </div>
  );
}
