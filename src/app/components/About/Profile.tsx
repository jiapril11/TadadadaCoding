import Image from "next/image";
import React from "react";
import { Kreon } from "next/font/google";

import profile from "/public/imgs/about/profile.jpeg";

const kreon = Kreon({ subsets: ["latin"] });

export default function Profile() {
  return (
    <section>
      <h2 className="sr-only">프로필</h2>
      <div className="flex flex-col items-center py-6">
        <Image
          src={profile}
          alt="프로필 이미지"
          className="w-40 h-40 rounded-full"
        />
        <div className="mt-4 text-center">
          <p className={`${kreon.className} text-black text-lg`}>Ji Young</p>
          <p className="text-gray-500 ">Frontend Developer</p>
        </div>
      </div>
    </section>
  );
}
