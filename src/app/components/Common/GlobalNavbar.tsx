"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function GlobalNavbar() {
  const currentRoute = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const linkNames = ["about", "posts", "projects"];

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav>
      {/* Desktop */}
      <ul className="hidden sm:flex sm:gap-5 sm:text-lg">
        {linkNames.map((name) => (
          <li key={name}>
            <Link
              href={`/${name}`}
              className={`capitalize ${
                currentRoute.includes("/" + name) &&
                `underline decoration-sky-500 underline-offset-4`
              }`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile */}
      <button
        className="flex relative group sm:hidden"
        onClick={handleToggleMobileMenu}
      >
        <div className="flex flex-col justify-between w-[20px] h-[20px] transform tansition-all duration-300 origin-center overflow-hidden">
          <div
            className={`h-[2px] w-7 transform transition-all duration-300 origin-left bg-slate-900`}
          ></div>
          <div
            className={`h-[2px] w-1/2 rounded transform transition-all duration-300 bg-slate-900`}
          ></div>
          <div
            className={`h-[2px] w-7 transform transition-all duration-300 origin-left bg-slate-900`}
          ></div>
        </div>
      </button>

      <div
        className={`top-0 left-0 w-full h-full bg-opacity-80 backdrop-blur-sm z-50 ${
          isMobileMenuOpen ? `fixed` : `hidden`
        }`}
      >
        <div
          className={`absolute top-0 bottom-0 w-2/3 flex flex-col justify-between bg-black bg-opacity-80 backdrop-blur-sm transition-all duration-500  ${
            isMobileMenuOpen ? `left-1/3` : `left-full`
          }`}
        >
          <button
            className="text-white text-2xl text-right ml-auto mr-4 mt-4"
            onClick={handleCloseMobileMenu}
          >
            <IoClose />
          </button>
          <div className="flex flex-col items-center gap-4 -mt-20">
            {/* TODO: Domain 변경 */}
            <Link
              href={`/`}
              onClick={handleCloseMobileMenu}
              className={`capitalize text-white text-xl ${
                currentRoute === "/" &&
                `underline decoration-sky-500 underline-offset-4`
              }`}
            >
              Home
            </Link>
            {linkNames.map((name) => (
              <Link
                key={name}
                href={`/${name}`}
                onClick={handleCloseMobileMenu}
                className={`capitalize text-white text-xl ${
                  currentRoute.includes("/" + name) &&
                  `underline decoration-sky-500 underline-offset-4`
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
          <div className="mb-2 overflow-hidden text-center text-sm text-white text-opacity-30">
            <p>Tadadada Coding Blog</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
