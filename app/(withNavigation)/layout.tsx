import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

export default async function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full bg-slate-800 flex flex-col justify-between">
      <Header/>
      <div className="rounded-3xl bg-slate-50 min-h-[80vh] p-5">{children}</div>
      <Footer />
    </div>
  );
}
