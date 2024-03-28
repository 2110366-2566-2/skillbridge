import { formatPaymentAmountWithCommas } from "@/lib/payment";

export default function PaymentInformation({
  studentName,
  realAmount,
  comAmount,
  totalAmount
}: {
  studentName: string;
  realAmount: number;
  comAmount: number;
  totalAmount: number;
}) {
  
  return (
    <div className="lg:order-2 lg:row-span-2 lg:mt-[13px]">
      <div className="flex">
        <p className="text-sm font-medium text-[#0F172A] lg:text-[20px]">
          ข้อมูลการชำระเงิน
        </p>
      </div>

      <div className="mt-[6px] border border-[#cbd5e1] py-[8px] px-[12px] rounded-md lg:py-[20px] lg:px-[20px]">
        <div className="flex">
          <p className="h-[24px] text-base font-bold text-[#1E293B] lg:text-[24px] lg:h-[34px]">
            นิสิต {studentName}
          </p>
        </div>

        <div className="w-full h-[24px] flex justify-between lg:h-[26px]">
          <p className="text-[#64748b] text-sm lg:text-[18px]">
            ค่ามัดจำการจ้างงาน
          </p>

          <p className="text-[#64748b] text-sm lg:text-[18px]">
            {formatPaymentAmountWithCommas(realAmount)} บาท
          </p>
        </div>

        <div className="w-full h-[24px] flex justify-between lg:h-[26px]">
          <p className="text-[#64748b] text-sm lg:text-[18px]">
            ค่าบริการ 15 %
          </p>

          <p className="text-[#64748b] text-sm lg:text-[18px]">
            {formatPaymentAmountWithCommas(comAmount)} บาท
          </p>
        </div>

        <div className="w-full h-[24px] flex justify-between lg:h-[26px]">
          <p className="text-[#1E293B] text-sm lg:text-[18px]">
            ยอดชำระทั้งหมด
          </p>

          <p className="text-[#1E293B] text-sm lg:text-[18px]">
            {formatPaymentAmountWithCommas(totalAmount)} บาท
          </p>
        </div>
      </div>
    </div>
  );
}
