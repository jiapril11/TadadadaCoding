import Image from "next/image";
import Link from "next/link";
import React from "react";
import Date from "./Date";

type postProp = {
  id: string;
  title: string;
  date: string;
  cover: string;
};

export default function Card({ post }: { post: postProp }) {
  return (
    <li className="rounded-md shadow-md hover:shadow-lg">
      <Link href={`/posts/${post.id}`}>
        <div className="relative h-28">
          {post.cover ? (
            <Image
              src={`/imgs/blog/cover/${post.cover}.jpeg`}
              alt={`${post.title} 썸네일`}
              fill
              className="rounded-tl-md rounded-tr-md"
            />
          ) : (
            <div className="h-full flex justify-center items-center text-gray-400 bg-gray-800 rounded-tl-md rounded-tr-md">
              <span>No Image</span>
            </div>
          )}
        </div>
        <div className="px-3 py-2">
          <p className="truncate mb-3 font-semibold">{post.title}</p>
          <Date dateString={post.date} />
        </div>
      </Link>
    </li>
  );
}
