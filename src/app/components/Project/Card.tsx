import { ProjectData } from "@/service/projects";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import { TbBrandGithub } from "react-icons/tb";

export default function Card({ project }: { project: ProjectData }) {
  const externalLinkStyle =
    "flex items-center justify-center space-x-0.5 text-slate-600 hover:underline";
  return (
    <li className="relative border border-black rounded-md overflow-hidden">
      <Link href={`/projects/${project.id}`}>
        <div className="relative h-[250px] md:h-[200px]">
          <Image
            src={`/imgs/projects/${project.imagePath}/${project.cover}`}
            alt={`${project.title} 썸네일`}
            priority
            fill={true}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        </div>
        <div className="flex space-x-1 absolute top-3 left-3">
          {project.categories.map((category, i) => (
            <span
              key={i}
              className="px-2 box-border text-sm text-white bg-blue-200/75 rounded-md"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="p-2">
          <div>
            <h3 className="font-semibold mb-3">{project.title}</h3>
            <p className="min-h-[40px] line-clamp-2 text-slate-400 text-sm">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
      <div className="p-2 flex justify-end space-x-3 mt-3 text-center">
        <a
          className={`${externalLinkStyle} relative after:content-[''] after:w-[1px] after:h-3/4 after:absolute after:top-1/2 after:-right-1.5 after:-translate-y-1/2 after:bg-slate-300`}
          href={project.url}
          target="_blank"
          rel="noreferrer noopener"
        >
          <HiOutlineExternalLink className="text-md" />
          <span className="text-sm">Visit</span>
        </a>
        <a
          className={externalLinkStyle}
          href={project.github}
          target="_blank"
          rel="noreferrer noopener"
        >
          <TbBrandGithub className="text-md" />
          <span className="text-sm">Github</span>
        </a>
      </div>
    </li>
  );
}
