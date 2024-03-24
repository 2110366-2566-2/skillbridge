import Image from "next/image";
export default function ChatButton({ jobId }: { jobId: string }) {
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
      </div>
  );
}
