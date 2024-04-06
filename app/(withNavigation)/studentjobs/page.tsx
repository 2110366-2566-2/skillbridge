import React from "react";
import StudentJobsMenu from "@/components/jobs/studentJobs/StudentJobsMenu";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function StudentJobsPage() {
    const session = await getServerSession();
    if (!session) {
        redirect("/login");
    }
    return (
        <div className="px-10">
            <React.Suspense>
                <StudentJobsMenu />
            </React.Suspense>
        </div>
    );
}
