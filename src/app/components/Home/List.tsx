import {
  BiLogoReact,
  BiLogoJavascript,
  BiLogoTypescript,
  BiSolidError,
  BiCoffeeTogo,
} from "react-icons/bi";
import { TbBrandNextjs } from "react-icons/tb";
import { FaCss3Alt, FaHtml5, FaGithub, FaNetworkWired } from "react-icons/fa";
import localFont from "next/font/local";
import Link from "next/link";
import { DateDistance } from "../Posts/Date";
import { PostData } from "@/service/posts";

const oksunFont = localFont({
  src: "../../../../public/fonts/her-leeoksun.ttf",
});

const postIcons: Record<string, React.ReactElement> = {
  react: <BiLogoReact />,
  next: <TbBrandNextjs />,
  typescript: <BiLogoTypescript />,
  javascript: <BiLogoJavascript />,
  css: <FaCss3Alt />,
  html: <FaHtml5 />,
  git: <FaGithub />,
  network: <FaNetworkWired />,
  error: <BiSolidError />,
  etc: <BiCoffeeTogo />,
};

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
            className={`relative w-full md:w-[78%] lg:w-[72%] px-1 sm:px-2 lg:px-3 text-xl ${oksunFont.className} group-hover:text-sky-500 lg:after:content-[''] lg:after:w-px lg:after:h-5/6 lg:after:absolute lg:after:top-1/2 lg:after:left-0 lg:after:-translate-y-1/2 lg:after:bg-black lg:before:content-[''] lg:before:w-px lg:before:h-5/6 lg:before:absolute lg:before:top-1/2 lg:before:right-0 lg:before:-translate-y-1/2 lg:before:-translate-x-3 lg:before:bg-black`}
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
