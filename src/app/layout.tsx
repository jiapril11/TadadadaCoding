import "./globals.css";
import type { Metadata } from "next";
import { Kreon, Noto_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import WidthLayout from "./components/WidthLayout";

import logo from "../../public/imgs/common/logo.svg";
import { FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

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
      <body className={`${notoSans.className} min-h-screen flex flex-col`}>
        <header className="h-20 flex items-center justify-center border border-b-black">
          <WidthLayout className="flex justify-between items-center">
            <h1>
              <Link href={"/"}>
                <Image src={logo} alt="로고" />
              </Link>
            </h1>
            <nav className={kreon.className}>
              <ul className="flex gap-5 text-lg">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/posts">Posts</Link>
                </li>
                <li>
                  <Link href="/projects">Projects</Link>
                </li>
              </ul>
            </nav>
          </WidthLayout>
        </header>
        <main className="flex-auto">{children}</main>
        <footer className="py-10 bg-black text-white">
          <WidthLayout className="flex flex-col items-center gap-3">
            <div className="flex gap-5">
              <Link href={"/about"}>
                <IoMailOutline className="text-4xl" />
              </Link>
              <Link
                href="https://github.com/jiapril11/TadadadaCoding"
                target="_blank"
              >
                <FaGithub className="text-4xl" />
              </Link>
            </div>
            <p className="text-sm text-gray-200 font-light">
              All Right Reserved.
            </p>
          </WidthLayout>
        </footer>
      </body>
    </html>
  );
}
