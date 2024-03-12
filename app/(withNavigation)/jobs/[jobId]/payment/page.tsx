import getPaymentsInfo from "@/actions/payment/getPaymentsInfo"
import Payment from "@/components/payment/payment"
import PaymentMethod from "@/components/payment/subPaymentComponent/paymentMethod"

export default async function PaymentPage({ params }: { params: { jobId: string } }) {
  const paymentsInfo = await getPaymentsInfo(params.jobId)
  console.log(paymentsInfo)

  return (
    <div className="w-full h-full">
      {paymentsInfo &&
        paymentsInfo.map((paymentInfo) => {
          return <Payment studentName={paymentInfo.user.firstname} price={paymentInfo.bid} />
        })}
      {/* <Payment studentName={data.studentName} price={data.price} /> */}
      <PaymentMethod />
      {/* Need to pass total amount */}
    </div>
  )
}
