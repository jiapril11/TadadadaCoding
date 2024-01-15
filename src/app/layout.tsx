import "./globals.css";
import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import Header from "./components/Header";
import Footer from "./components/Footer";

const notoSans = Noto_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tadadada Coding",
  description: "Ji's Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${notoSans.className} min-h-screen flex flex-col pt-20`}
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
