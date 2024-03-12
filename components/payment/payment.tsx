import PaymentInformation from "./subPaymentComponent/paymentInformation"
export default function Payment({ studentName, price }: { studentName: string, price: number }) {
    return (
        <div className="flex flex-col">
            <PaymentInformation studentName={studentName} price={price} />
        </div>
    )
}
