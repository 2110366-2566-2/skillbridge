import { Suspense } from "react";
import LoadingProfilePage from "@/components/profile/LoadingProfilePage";

export default async function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<LoadingProfilePage />}>
            {children}
        </Suspense>
    );
}
