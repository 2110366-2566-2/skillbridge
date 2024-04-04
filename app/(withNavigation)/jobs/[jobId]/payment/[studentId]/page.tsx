import { getPaymentInfo } from "@/actions/payment/paymentinfo"
import Payment from "@/components/payment/payment"
import { calculateRealAmount, calculateComAmount, calculateTotalAmount } from "@/lib/payment"

export default async function PaymentPage({
  params,
}: {
  params: { jobId: string; studentId: string }
}) {
  const data = await getPaymentInfo(params.jobId, params.studentId)
  const bid = data?.bid ? data.bid : 0
  const realAmount = calculateRealAmount(bid)
  const comAmount = calculateComAmount(bid)
  const totalAmount = calculateTotalAmount(bid)

  return (
    <div className="w-full h-full">
      {/* Applcation status as props in paymentinfo */}

      <Payment
        studentName={
          data
            ? `${data.user.salutation}${data.user.firstname} ${data.user.middlename || ""} ${data.user.lastname}`
            : ""
        }
        jobId={params.jobId}
        studentId={params.studentId}
        isDeposit={data ? data.status === "DEPOSIT_PENDING" : false}
        isWage={data ? data.status === "WAGE_PAYMENT_PENDING" : false}
        realAmount={realAmount}
        comAmount={comAmount}
        totalAmount={totalAmount}
      />
    </div>
  )
}
