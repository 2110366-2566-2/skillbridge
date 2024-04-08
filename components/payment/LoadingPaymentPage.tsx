import LoadingPaymentMethod from "./subPaymentComponent/LoadingPaymentMethod";
import LoadingPaymentInformation from "./subPaymentComponent/LoadingPaymentInformation";
import LoadingUploadPayment from "./subPaymentComponent/LoadingUploadPayment";
export default function LoadingPaymentPage() {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:grid-rows-5 lg:gap-x-8 lg:gap-y-0 lg:h-auto lg:pt-[24px] lg:px-[50px] lg:text-center lg:justify-center 2xl:px-[200px]">
            <LoadingPaymentInformation />
            <LoadingPaymentMethod />
            <LoadingUploadPayment />
        </div>
    );
}
