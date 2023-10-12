import "./globals.css";
import type { Metadata } from "next";
import { Kreon, Noto_Sans } from "next/font/google";

const kreon = Kreon({ subsets: ["latin"] });
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
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
