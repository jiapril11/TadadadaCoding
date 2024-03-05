import Link from "next/link";
import { DateDistance } from "../Posts/Date";
import { PostData } from "@/service/posts";
import postIcons from "../postIcon";

export default function List({ post }: { post: PostData }) {
  const postCategory = post.category.toLocaleLowerCase();
  return (
    <li key={post.id} className="py-3 group">
      <Link href={`/posts/${post.id}`}>
        <div className="flex justify-between">
          <div className="hidden lg:flex lg:px-3 lg:w-[12%]">
            {Object.keys(postIcons).includes(postCategory) && (
              <p className="flex items-center gap-[7%]">
                <span>{postIcons[postCategory]}</span>
                <span>{post.category}</span>
              </p>
            )}
          </div>
          <div
            className={`relative w-full md:w-[78%] lg:w-[72%] px-1 sm:px-2 lg:pl-5 lg:pr-3 text-normal group-hover:text-sky-500 lg:after:content-[''] lg:after:w-px lg:after:h-5/6 lg:after:absolute lg:after:top-1/2 lg:after:left-0 lg:after:-translate-y-1/2 lg:after:bg-gray-300 lg:before:content-[''] lg:before:w-px lg:before:h-5/6 lg:before:absolute lg:before:top-1/2 lg:before:right-0 lg:before:-translate-y-1/2 lg:before:-translate-x-3 lg:before:bg-gray-300`}
          >
            <div className="flex items-center gap-1">
              {Object.keys(postIcons).includes(postCategory) && (
                <span className="lg:hidden w-[6%] sm:w-[5%]">
                  {postIcons[postCategory]}
                </span>
              )}
              <p className="w-[94%] sm:w-[95%] lg-[100%] truncate">
                {post.title}
              </p>
            </div>
          </div>
          <div className="hidden md:flex md:w-[22%] lg:w-[16%] lg:flex">
            <DateDistance dateString={post.date} />
          </div>
        </div>
      </Link>
    </li>
  );
}
