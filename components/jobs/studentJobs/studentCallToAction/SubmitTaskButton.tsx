"use client";

import { inProgressToDelivered } from "@/actions/jobs/jobCards/studentChangeApplicationState";
import ChatLink from "../../ChatLink";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";
import { useState } from "react";
import toast from "react-hot-toast";
export default function SubmitTaskButton({ jobId, employerId }: { jobId: string, employerId: string }) {
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
  return (
      <div className="flex flex-row justify-between w-full gap-1">
          <ChatLink
              jobId={jobId}
              employerId={employerId}
              className="flex flex-row justify-center items-center py-2 px-3 w-full bg-slate-50 text-sm text-slate-900 border border-slate-700 rounded-md hover:shadow-md hover:border-slate-800 active:border-slate-900 transition duration-200 ease-in-out"
          />

          <PrimaryButton
              className="flex justify-center items-center py-2 px-3 w-full bg-slate-600 text-sm text-white rounded-md hover:shadow-md hover:bg-slate-700 active:bg-slate-800 transition duration-200 ease-in-out"
              isLoading={isLoading}
              isDisabled={isDisabled}
              onClick={async () => {
                  setLoading(true);
                  setDisabled(true);
                  await inProgressToDelivered(jobId);
                  setLoading(false);
                  setDisabled(false);
                  toast.success("ส่งมอบงานแล้ว");
                  location.reload();
              }}
          >
              ส่งมอบงาน
          </PrimaryButton>
      </div>
  );
}
