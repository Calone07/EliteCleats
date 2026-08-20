import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import { MotionProvider } from "@/motion";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
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
    <html lang="en" className={`${inter.variable} ${anton.variable} h-full`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0);}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-primary-bg text-primary-text antialiased">
        <MotionProvider>
          <Providers>
            <Navbar />
            <main className="flex-1 pt-[104px] sm:pt-[120px]">{children}</main>
            <Footer />
          </Providers>
        </MotionProvider>
      </body>
    </html>
  );
}
