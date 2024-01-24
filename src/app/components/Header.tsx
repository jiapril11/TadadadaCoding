import React from "react";
import { Kreon } from "next/font/google";
import WidthLayout from "./WidthLayout";
import Link from "next/link";
import GlobalNavbar from "./Common/GlobalNavbar";
import LogoSVG from "./Common/SVG/LogoSVG";

const kreon = Kreon({ subsets: ["latin"] });

export default function Header() {
  return (
    <header
      className={`fixed w-full h-20 z-[9000] left-0 top-0 right-0 flex items-center justify-center border border-b-black bg-white ${kreon.className}`}
    >
      <WidthLayout className="flex justify-between items-center">
        <h1>
          <Link href={"/"} className="flex items-center gap-1">
            <LogoSVG pathColor="#000" />
            <span className="hidden sm:block text-xl">
              Tadadada Coding Blog
            </span>
          </Link>
        </h1>
        <GlobalNavbar />
      </WidthLayout>
    </header>
  );
}
