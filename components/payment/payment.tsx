import PaymentInformation from "./subPaymentComponent/paymentInformation"
import PaymentMethod from "./subPaymentComponent/paymentMethod"
import UpLoadPayment from "./subPaymentComponent/upLoadPayment"
export default function Payment({ studentName, price, jobId }: { studentName: string, price: number, jobId: string }) {
    return (
        <div className="flex flex-col">
            <PaymentInformation studentName={studentName} price={price} />
            <PaymentMethod price={price} />
            <UpLoadPayment label="อัพโหลดสลิปโอนเงิน" jobId={jobId} />
        </div>
    )
}
