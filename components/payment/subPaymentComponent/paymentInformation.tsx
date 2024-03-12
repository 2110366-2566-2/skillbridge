export default function PaymentInformation({ studentName, price }: { studentName: string, price: number }) {
    return (
        <div>
            <p className="text-sm font-medium text-[#0F172A]">
                ข้อมูลการชำระเงิน
            </p>

            <div className="mt-[6px] border border-[#cbd5e1] py-[8px] px-[12px] rounded-md">

                <p className="w-full h-[24px] text-base font-bold text-[#1E293B]">
                    นิสิต {studentName}
                </p>

                <div className="w-full h-[24px] flex justify-between">

                    <p className="text-[#64748b] text-sm">
                        ค่ามัดจำการจ้างงาน
                    </p>

                    <p className="text-[#64748b] text-sm">
                        {price * 0.5} บาท
                    </p>

                </div>

                <div className="w-full h-[24px] flex justify-between">

                    <p className="text-[#64748b] text-sm">
                        ค่าบริการ 15 %
                    </p>

                    <p className="text-[#64748b] text-sm">
                        {(price * 0.5) * 0.15} บาท
                    </p>

                </div>

                <div className="w-full h-[24px] flex justify-between">

                    <p className="text-[#1E293B] text-sm">
                        ยอดชำระทั้งหมด
                    </p>

                    <p className="text-[#1E293B] text-sm">
                        {(price * 0.5) * 0.15 + (price * 0.5)} บาท
                    </p>

                </div>

            </div>

        </div>
    )
}
