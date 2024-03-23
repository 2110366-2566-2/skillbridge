import { acknowledgeApplication } from "@/actions/jobs/jobCards/studentChangeApplicationState";

export default function AckFailureButton({ jobId }: { jobId: string }) {
  return (
      <div className="flex flex-row justify-between w-full gap-1">
          <button
              className="py-2 px-3 w-full bg-slate-600 text-sm text-white rounded-md hover:shadow-md hover:bg-slate-700 active:bg-slate-800 transition duration-200 ease-in-out"
              onClick={async () => {
                  await acknowledgeApplication(jobId);
                  location.reload();
              }}
          >
              ปิด
          </button>
      </div>
  );
}
