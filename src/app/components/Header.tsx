'use client';

import React, { useEffect, useRef } from "react";
import { Kreon } from "next/font/google";
import WidthLayout from "./WidthLayout";
import Link from "next/link";
import GlobalNavbar from "./Common/GlobalNavbar";
// import LogoSVG from "./Common/SVG/LogoSVG";
import { usePathname } from 'next/navigation';

const kreon = Kreon({ subsets: ["latin"] });

export default function Header() {
  const pathName = usePathname();
  const isHome = pathName === '/';
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if(window.scrollY > 60) {
        headerRef.current?.classList.add('backdrop-blur-sm');
        isHome ?
          headerRef.current?.classList.add('bg-black/75') :
          headerRef.current?.classList.add('bg-white/75');
      } else {
        headerRef.current?.classList.remove('backdrop-blur-sm');
        isHome ?
          headerRef.current?.classList.remove('bg-black/75') :
          headerRef.current?.classList.remove('bg-white/75');
      }
    }
    window.addEventListener('scroll', onScroll, {passive: true});

    return () => window.removeEventListener('scroll', onScroll)
  })

  return (
    <header
      ref={headerRef}
      className={`fixed w-full h-20 z-[9000] left-0 top-0 right-0 flex items-center justify-center border border-b-black ${kreon.className} ${isHome ? 'bg-black border-black' : 'bg-white'}`}
    >
      <WidthLayout className="flex justify-between items-center">
        <h1>
          <Link href={"/"} className="flex items-center gap-1">
            {/* <LogoSVG pathColor="#000" /> */}
            <span className={`text-lg sm:block sm:text-xl ${isHome ? 'text-white opacity-50' : 'text-black'}`}>
              Tadadada.Coding
            </span>
          </Link>
        </h1>
        <GlobalNavbar />
      </WidthLayout>
    </header>
  );
}
