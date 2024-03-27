"use client";

import { inProgressToDelivered } from "@/actions/jobs/jobCards/studentChangeApplicationState";
import Image from "next/image";
import { useRouter } from "next/router";
export default function SubmitTaskButton({ jobId }: { jobId: string }) {
  return (
      <div className="flex flex-row justify-between w-full gap-1">
          <button
              className="flex flex-row justify-center items-center py-2 px-3 w-full bg-slate-50 text-sm text-slate-900 border border-slate-700 rounded-md hover:shadow-md hover:border-slate-800 active:border-slate-900 transition duration-200 ease-in-out"
              onClick={() => alert("go to chat")}
          >
              <Image
                  src={"/icons/chat.svg"}
                  alt="chat"
                  width={13}
                  height={13}
                  className="mr-[3px]"
              />
              <p className="">แชท</p>
          </button>
          <button
              className="py-2 px-3 w-full bg-slate-600 text-sm text-white rounded-md hover:shadow-md hover:bg-slate-700 active:bg-slate-800 transition duration-200 ease-in-out"
              onClick={async () => {
                  await inProgressToDelivered(jobId);
                  location.reload();
              }}
          >
              ส่งมอบงาน
          </button>
      </div>
  );
}
