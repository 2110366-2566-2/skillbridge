import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-h-fit min-h-screen bg-slate-800 flex flex-col justify-between">
      <Header />
      <div className="min-h-full max-h-fit rounded-3xl bg-slate-50 p-5">{children}</div>
      <Footer />
    </div>
  );
}
