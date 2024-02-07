import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full bg-slate-800 flex flex-col justify-between">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
