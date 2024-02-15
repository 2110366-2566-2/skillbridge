import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });
const ibmPlexSansThaiLooped = IBM_Plex_Sans_Thai({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai"],
  variable: "--ibm-plex-sans-thai-font",
});

export const metadata: Metadata = {
  title: "Skillbridge",
  description: "Skillbridge by Soei",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" type="x-icon" href="/icons/logo.svg" />
      </head>
      <body
        className={cn(
          inter.className,
          ibmPlexSansThaiLooped.className,
          "h-screen",
        )}
      >
        <AuthProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "font-semibold bg-white text-slate-800",
              success: {
                iconTheme: {
                  primary: "#1e293b",
                  secondary: "white",
                },
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
