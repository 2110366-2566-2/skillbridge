import PaymentInformation from "./subPaymentComponent/PaymentInformation"
import PaymentMethod from "./subPaymentComponent/PaymentMethod"
import UploadPayment from "./subPaymentComponent/UploadPayment"

export default function Payment({
  studentName,
  studentId,
  jobId,
  isDeposit,
  isWage,
  realAmount,
  comAmount,
  totalAmount,
}: {
  studentName: string
  studentId: string
  jobId: string
  isDeposit: boolean
  isWage: boolean
  realAmount: number
  comAmount: number
  totalAmount: number
}) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-5 lg:gap-x-8 lg:gap-y-0 lg:h-auto lg:pt-[24px] lg:px-[50px] lg:text-center lg:justify-center 2xl:px-[200px]">
      <PaymentInformation
        studentName={studentName}
        realAmount={realAmount}
        comAmount={comAmount}
        totalAmount={totalAmount}
        isWage={isWage}
      />
      <PaymentMethod totalAmount={totalAmount} />
      <UploadPayment
        label="อัพโหลดสลิปโอนเงิน"
        jobId={jobId}
        studentId={studentId}
        totalAmount={totalAmount}
        isDeposit={isDeposit}
      />
    </div>
  )
}
