import PaymentInformation from "./subPaymentComponent/paymentInformation"
import PaymentMethod from "./subPaymentComponent/paymentMethod"
import UpLoadPayment from "./subPaymentComponent/upLoadPayment"
export default function Payment({ studentName, price, jobId }: { studentName: string, price: number, jobId: string }) {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-5 lg:gap-x-16 lg:gap-y-0 lg:h-auto lg:pt-[24px] lg:px-[50px] lg:text-center lg:justify-center 2xl:px-[200px]">
            <PaymentInformation studentName={studentName} price={price} />
            <PaymentMethod price={price} />
            <UpLoadPayment label="อัพโหลดสลิปโอนเงิน" jobId={jobId} />
        </div>
    )
}
