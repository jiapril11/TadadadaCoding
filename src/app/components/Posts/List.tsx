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
import DateNormal from "./Date";
import { PostData } from "@/service/posts";

const myFont = localFont({ src: "../../../../public/fonts/her-leeoksun.ttf" });

export const postIcons: Record<string, React.ReactElement> = {
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
          <div
            className={`relative w-full md:w-[84%] px-4 text-xl ${myFont.className} group-hover:text-sky-500 before:content-[''] md:before:w-px md:before:h-5/6 md:before:absolute md:before:top-1/2 md:before:right-0 md:before:-translate-y-1/2 md:before:-translate-x-3 md:before:bg-black`}
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
