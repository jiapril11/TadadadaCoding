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
        <div className="text-center">
          <TypeAnimation
            style={{
              whiteSpace: "pre-line",
              display: "block",
              height: "270px",
              padding: "40px",
              fontSize: "1.725rem",
              lineHeight: "2",
            }}
            sequence={[
              `Hello, stranger.\nWelcome to my blog :)\nHope you have good time here.`,
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
