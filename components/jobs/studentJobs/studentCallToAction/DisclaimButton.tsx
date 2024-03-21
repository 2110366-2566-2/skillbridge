"use client";

import { pendingToDisclaimed } from "@/actions/jobs/jobCards/studentChangeApplicationState";

export default function DisclaimButton({ jobId }: { jobId: string }) {
  return (
    <div className="flex flex-row justify-between w-full gap-1">
      <button
        className="py-2 px-3 w-full bg-red-500 text-sm text-white rounded-md hover:shadow-md hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
        onClick={async () => {
          await pendingToDisclaimed(jobId);
          //this shit is not efficient
          location.reload();
        }}
      >
        สละสิทธิ์
      </button>
    </div>
  );
}
