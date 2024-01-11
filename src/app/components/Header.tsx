import React from "react";
import { Kreon } from "next/font/google";
import WidthLayout from "./WidthLayout";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/imgs/common/logo.svg";
import GlobalNavbar from "./Common/GlobalNavbar";

const kreon = Kreon({ subsets: ["latin"] });

export default function Header() {
  return (
    <header
      className={`fixed w-full h-20 z-[9000] left-0 top-0 right-0 flex items-center justify-center border border-b-black bg-white ${kreon.className}`}
    >
      <WidthLayout className="flex justify-between items-center">
        <h1>
          <Link href={"/"} className="flex items-center gap-1">
            <Image src={logo} alt="타다다다 코딩 로고" priority />
            <span className="invisible sm:visible text-xl">
              Tadadada Coding Blog
            </span>
          </Link>
        </h1>
        <GlobalNavbar />
      </WidthLayout>
    </header>
  );
}
