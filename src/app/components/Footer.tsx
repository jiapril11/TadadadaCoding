'use client'

import React from "react";
import Link from "next/link";
import WidthLayout from "./WidthLayout";

import { FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import LogoSVG from "./Common/SVG/LogoSVG";
import { usePathname } from 'next/navigation';

export default function Footer() {
  const currentRoute = usePathname();
  if(currentRoute === '/') {
    return (
      <footer className="flex bg-black text-xs tracking-[2px] text-[#ffffff36] border-t border-t-[#ffffff0a] flex-col items-start gap-2 py-5 px-[5vw] md:flex-row md:items-center md:py-5 md:px-[6vw] lg:py-6 lg:px-[10vw]">
        <span>TADADADA.CODING</span>
        <span className="sm:ml-0 md:ml-auto text-[#0ea5e959]">© 2025 — All rights reserved</span>
      </footer>
    )
  } else {
    return (
      <footer className="py-10 bg-black text-white">
        <WidthLayout className="flex flex-col items-center gap-3">
          <Link href={"/"} className="flex flex-col items-center">
            <LogoSVG pathColor="#fff" />
            <h1 className="text-sm opacity-80">TadadadaCodingBlog</h1>
            <p className="text-xs opacity-60">&copy;All Right Reserved</p>
          </Link>
          <div className="w-px h-11 bg-white opacity-20"></div>
          <div className="flex flex-col items-center">
            <h2 className="text-xs opacity-60">Contact</h2>
            <p className="text-sm opacity-80">tadadadacoding@gmail.com</p>
          </div>
          <div className="relative flex gap-8 after:contents-[''] after:w-px after:h-full after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white after:opacity-20">
            <Link href={"/contact"} className="md:opacity-60 md:hover:opacity-100">
              <IoMailOutline className="text-3xl" />
            </Link>
            <Link
              href="https://github.com/jiapril11/TadadadaCoding"
              target="_blank"
              className="md:opacity-60 md:hover:opacity-100"
            >
              <FaGithub className="text-3xl" />
            </Link>
          </div>
        </WidthLayout>
      </footer>
    );

  }
}
