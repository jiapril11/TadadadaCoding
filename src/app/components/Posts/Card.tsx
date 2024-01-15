import Image from "next/image";
import Link from "next/link";
import React from "react";
import DateNormal, { DateDistance } from "./Date";

type postProp = {
  id: string;
  title: string;
  date: string;
  cover: string;
};

// TODO: dateType 상수화
export default function Card({
  post,
  dateType,
}: {
  post: postProp;
  dateType: "normal" | "distance";
}) {
  return (
    <li className="relative border border-black rounded-md overflow-hidden">
      <Link href={`/posts/${post.id}`}>
        <div className="relative h-[250px] md:h-[200px]">
          {post.cover ? (
            <Image
              src={`/imgs/blog/cover/${post.cover}.jpeg`}
              alt={`${post.title} 썸네일`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full flex justify-center items-center text-gray-400 bg-gray-800">
              <span>No Image</span>
            </div>
          )}
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
