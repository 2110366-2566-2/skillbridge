import { Suspense } from "react";
import LoadingPaymentPage from "@/components/payment/LoadingPaymentPage";

export default async function PaymentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<LoadingPaymentPage />}>
            {children}
        </Suspense>
    );
}
