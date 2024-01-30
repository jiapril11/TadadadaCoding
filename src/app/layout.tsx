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
  metadataBase: new URL("https://tadadadacoding.com"),
  title: {
    default: "Tadadada Coding",
    template: "%s | Tadadada Coding",
  },
  description: "IT 관련 공부 내용을 정리하고 작업한 프로젝트를 소개하는 블로그",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: {
      default: "Tadadada Coding",
      template: "%s | Tadadada Coding",
    },
    description:
      "IT 관련 공부 내용을 정리하고 작업한 프로젝트를 소개하는 블로그",
    url: "https://tadadadacoding.com",
    siteName: "Tadadada Coding",
  },
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
