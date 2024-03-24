export default function jobDescription({
  jobId,
  title,
  price,
  jobDescription,
  tag,
  nubmerOfAcceptedApplication,
  numberOfMaximumAccepted,
  period,
}: {
  jobId: string;
  title: string;
  price: string;
  jobDescription: string;
  tag: string;
  nubmerOfAcceptedApplication: string;
  numberOfMaximumAccepted: string;
  period: string;
}) {
  return (
    <div className="flex flex-col items-end w-[335px]">
      <div className="relative w-[335px] h-[185px] px-[20px] pt-[25px] bg-white rounded-xl shadow-lg">
        <div className="w-full">
          {/* Title Component */}
          <div className="flex w-[295px]">
            <p className="font-semibold text-[#313866] text-xl line-clamp-1">
              {title}
            </p>
          </div>

          {/* Period Component */}
          <div className="mt-[10px]">
            <p className="font-medium text-[15.5px] text-slate-500 text-wrap line-clamp-1">
              {period}
            </p>
          </div>

          <div className="flex mt-[10px]">
            {/* Tag Component */}
            <div className="flex justify-center items-center bg-[#e2e8f0] px-[10px] py-[5px] mr-[5px] rounded-[4px]">
              <p className="text-sm">{tag}</p>
            </div>
          </div>

          {/* Job Description Component */}
          <div className="flex mt-[10px]">
            <p className="mr-[10px] text-sm flex justify-center w-[126px] items-center font-medium">
              คำอธิบายเกี่ยวกับงาน
            </p>
            <div className="flex items-center">
              <p className="text-xs text-[#838383] truncate w-[159px]">
                {jobDescription}
              </p>
            </div>
          </div>

          <div className="absolute w-[295px] flex justify-between bottom-[10px]">
            {/* AcceptedApplication Number Component */}
            <div className="flex items-center">
              <p className="text-xs text-[#64748b]">
                สมัครแล้ว {nubmerOfAcceptedApplication}/
                {numberOfMaximumAccepted} คน
              </p>
            </div>
            {/* Price Component */}
            <p className="text-md text-[#313866] font-semibold">฿{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
