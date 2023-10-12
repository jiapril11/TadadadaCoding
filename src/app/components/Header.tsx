import React from "react";
import { Kreon } from "next/font/google";
import WidthLayout from "./WidthLayout";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/imgs/common/logo.svg";

const kreon = Kreon({ subsets: ["latin"] });

export default function Header() {
  return (
    <header className="h-20 flex items-center justify-center border border-b-black">
      <WidthLayout className="flex justify-between items-center">
        <h1>
          <Link href={"/"}>
            <Image src={logo} alt="로고" priority />
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
  );
}
