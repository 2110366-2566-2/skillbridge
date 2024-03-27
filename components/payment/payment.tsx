import PaymentInformation from "./subPaymentComponent/paymentInformation";
import PaymentMethod from "./subPaymentComponent/paymentMethod";
import UploadPayment from "./subPaymentComponent/upLoadPayment";
export default function Payment({
  studentName,
  studentId,
  price,
  jobId,
  isDeposit,
}: {
  studentName: string;
  studentId: string;
  price: number;
  jobId: string;
  isDeposit: boolean;
}) {
  const totalPrice = price * 0.5 * 0.15 + price * 0.5;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-5 lg:gap-x-8 lg:gap-y-0 lg:h-auto lg:pt-[24px] lg:px-[50px] lg:text-center lg:justify-center 2xl:px-[200px]">
      <PaymentInformation studentName={studentName} price={price} />
      <PaymentMethod totalPrice={parseFloat(totalPrice.toFixed(2))} />
      <UploadPayment
        label="อัพโหลดสลิปโอนเงิน"
        jobId={jobId}
        studentId={studentId}
        totalPrice={totalPrice}
        isDeposit={isDeposit}
      />
    </div>
  );
}
