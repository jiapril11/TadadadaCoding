"use client";

import localFont from "next/font/local";
import Image from "next/image";

const oksunFont = localFont({
  src: "../../../../public/fonts/her-leeoksun.ttf",
});

type Props = {
  frontmatter: {
    title: string;
    coverTitle: string;
  };
};

export default function HeroTitle({ frontmatter }: Props) {
  const { title, coverTitle } = frontmatter;
  return (
    <>
      <div
        className={`flex justify-center items-center min-h-[200px] md:min-h-[300px] p-5 md:p-10 bg-black transition-height`}
      >
        <p
          className={`max-w-[1200px] text-center text-white text-3xl md:text-4xl md:leading-snug ${oksunFont.className}`}
        >
          {coverTitle}
        </p>
      </div>
    </>
  );
}
