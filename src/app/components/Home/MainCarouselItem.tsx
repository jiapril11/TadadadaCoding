import Image from "next/image";
import { ITEM_HEIGHT, ProjectTypeCarousel } from "./TwinCarousel";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import { TbBrandGithub } from "react-icons/tb";
import { BiDetail } from "react-icons/bi";

export default function MainCarouselItem({
  project,
}: {
  project: ProjectTypeCarousel;
}) {
  const { title, logo, skills, github, url, pageLink } = project;
  const itemHeight = ITEM_HEIGHT;
  return (
    <div className={`relative w-full`} style={{ height: `${itemHeight}px` }}>
      <div
        className={`absolute top-0 left-1/2 md:left-auto md:right-5 w-11/12 md:w-2/5 flex flex-col px-5 py-4 -translate-x-1/2 md:translate-x-0 bg-white shadow-md md:shadow-none rounded transition-all`}
      >
        <div className="flex items-center gap-2 mb-5">
          <Image
            src={logo}
            alt={`${project.title}`}
            width="46"
            height="46"
            className="w-auto h-auto"
          />
          <h3 className="text-2xl font-semibold">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded bg-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-end mt-5 space-x-2">
          <a
            href={url}
            className="hover:scale-110"
            rel="noreferrer noopener"
            target="_blank"
          >
            <HiOutlineExternalLink className="text-xl stroke-gray-900" />
          </a>
          <a
            href={github}
            className="hover:scale-110"
            rel="noreferrer noopener"
            target="_blank"
          >
            <TbBrandGithub className="text-xl stroke-gray-900" />
          </a>
          <Link href={pageLink} className="hover:scale-110">
            <BiDetail className="text-xl fill-gray-900" />
          </Link>
        </div>
      </div>
    </div>
  );
}
