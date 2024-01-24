"use client";

import React from "react";
import WidthLayout from "../WidthLayout";
import { TypeAnimation } from "react-type-animation";
import { Pixelify_Sans } from "next/font/google";

const pixelifySans = Pixelify_Sans({ subsets: ["latin"] });

export default function MainBanner() {
  return (
    <div className=" bg-black text-white">
      <WidthLayout className={pixelifySans.className}>
        <div className="h-[200px] flex justify-center items-center text-center sm:h-[300px] ">
          <TypeAnimation
            className="h-[150px] block text-2xl/loose whitespace-pre-line sm:h-[200px] sm:text-3xl/loose"
            sequence={[
              `Hello, stranger :)\nWelcome to my\nTadadadaCoding Blog`,
              10000,
              "",
            ]}
            repeat={Infinity}
          />
        </div>
      </WidthLayout>
    </div>
  );
}
