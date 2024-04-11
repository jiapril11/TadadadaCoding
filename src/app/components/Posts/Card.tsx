import Link from "next/link";
import React from "react";
import DateNormal, { DateDistance } from "./Date";
import { PostData } from "@/service/posts";
import localFont from "next/font/local";

const oksunFont = localFont({
  src: "../../../../public/fonts/her-leeoksun.ttf",
});

type Props = {
  post: PostData;
  dateType: "normal" | "distance";
};

// TODO: dateType 상수화
export default function Card({ post, dateType }: Props) {
  return (
    <li className="relative border border-black rounded-md overflow-hidden">
      <Link href={`/posts/${post.id}`}>
        <div className="relative flex justify-center items-center w-full min-h-[200px] md:min-h-[250px] p-3 bg-black">
          <h2
            className={`p-0.5 text-3xl text-center text-white font-bold break-keep bg-black ${oksunFont.className}`}
          >
            {post.coverTitle}
          </h2>
        </div>
        <div className="px-3 py-2 box-border">
          <p className="truncate mb-3 font-semibold">{post.title}</p>
          {dateType === "normal" ? (
            <DateNormal dateString={post.date} />
          ) : (
            <DateDistance dateString={post.date} />
          )}
        </div>
      </Link>
    </li>
  );
}
