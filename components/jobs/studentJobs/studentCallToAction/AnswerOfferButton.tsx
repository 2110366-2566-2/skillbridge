"use client";

import {
  acceptedToDepositPending,
  acceptedToDisclaimed,
} from "@/actions/jobs/jobCards/studentChangeApplicationState";

export default function AnswerOfferButton({ jobId }: { jobId: string }) {
  return (
      <div className="flex flex-row justify-between w-full gap-1">
          <button
              className="py-2 px-3 w-full bg-red-500 text-sm text-white rounded-md hover:shadow-md hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
              onClick={async () => {
                  await acceptedToDisclaimed(jobId);
                  location.reload();
              }}
          >
              ปฏิเสธ
          </button>
          <button
              className="py-2 px-3 w-full bg-slate-600 text-sm text-white rounded-md hover:shadow-md hover:bg-slate-700 active:bg-slate-800 transition duration-200 ease-in-out"
              onClick={async () => {
                  await acceptedToDepositPending(jobId);
                  location.reload();
              }}
          >
              ยืนยัน
          </button>
      </div>
  );
}
