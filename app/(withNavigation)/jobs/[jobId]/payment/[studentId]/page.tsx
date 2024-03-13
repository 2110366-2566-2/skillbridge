import { getPaymentInfo } from "@/actions/payment/paymentinfo"
import Payment from "@/components/payment/payment"
import PaymentMethod from "@/components/payment/subPaymentComponent/paymentMethod"

export default async function PaymentPage({
  params,
}: {
  params: { jobId: string; studentId: string }
}) {
  const data = await getPaymentInfo(params.jobId, params.studentId)

  return (
    <div className="w-full h-full">
      {/* Applcation status as props in paymentinfo */}
      <Payment
        studentName={
          data
            ? `${data.user.salutation}${data.user.firstname} ${data.user.middlename || ""} ${data.user.lastname}`
            : ""
        }
        price={data ? data.bid : 0}
      />
      <PaymentMethod price={data ? data.bid : 0} />
    </div>
  )
}
