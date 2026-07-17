import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import { MotionProvider } from "@/motion";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELITE CLEATS — Premium Football Boots",
  description:
    "Engineered for speed. Designed for champions. Discover premium football boots from the world's top brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-primary-bg text-primary-text antialiased">
        <MotionProvider>
          <Navbar />
          <main className="flex-1 pt-[104px] sm:pt-[120px]">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
