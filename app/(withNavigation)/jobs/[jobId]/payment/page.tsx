import Payment from "@/components/payment/payment"
import PaymentMethod from "@/components/payment/subPaymentComponent/paymentMethod"

export default async function PaymentPage({ params }: { params: { jobId: string } }) {

    const data = {
        studentName: "หน่องนอร์ทรักบุ๊ค",
        price: 1500,
        studentPhone: '0999999999',
    }

    return (
        <div className="w-full h-full">
            <Payment studentName={data.studentName} price={data.price} />
            <PaymentMethod />
        </div>
    )
}
