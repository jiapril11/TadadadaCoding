import Link from "next/link";
import DateNormal from "./Date";
import { PostData } from "@/service/posts";
import postIcons from "../postIcon";

export default function List({ post }: { post: PostData }) {
  const postCategory = post.category.toLocaleLowerCase();
  return (
    <li key={post.id} className="py-3 group">
      <Link href={`/posts/${post.id}`}>
        <div className="flex justify-between">
          <div
            className={`relative w-full md:w-[84%] px-4 text-normal group-hover:text-sky-500 before:content-[''] md:before:w-px md:before:h-5/6 md:before:absolute md:before:top-1/2 md:before:right-0 md:before:-translate-y-1/2 md:before:-translate-x-3 md:before:bg-gray-300`}
          >
            <div className="flex items-center gap-1">
              {Object.keys(postIcons).includes(postCategory) && (
                <span className="w-[6%]">{postIcons[postCategory]}</span>
              )}
              <p className="w-[94%] truncate">{post.title}</p>
            </div>
          </div>

          <div className="hidden md:w-[16%] md:flex md:shrink-0">
            <DateNormal dateString={post.date} />
          </div>
        </div>
      </Link>
    </li>
  );
}
