import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full bg-slate-800 flex flex-col justify-between">
      <Header />
      <div className="rounded-3xl bg-slate-50 h-full p-5">{children}</div>
      <Footer />
    </div>
  );
}
