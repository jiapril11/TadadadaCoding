import React from "react";
import Link from "next/link";
import WidthLayout from "./WidthLayout";

import { FaGithub } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

export default function Footer() {
  return (
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
        <p className="text-sm text-gray-200 font-light">All Right Reserved.</p>
      </WidthLayout>
    </footer>
  );
}
