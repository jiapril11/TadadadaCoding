import React from "react";
import WidthLayout from "../components/WidthLayout";
import { getSortedProjectsData } from "@/service/projects";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import { TbBrandGithub } from "react-icons/tb";

export default function ProjectsPage() {
  const projects = getSortedProjectsData();
  let categories = projects.map((project) => project.categories).flat();
  categories = [...new Set(categories)];
  return (
    <WidthLayout>
      <h2 className="mt-6 mb-5 font-semibold text-2xl">Projects</h2>
      <div className="flex space-x-2 mb-5">
        <button className="px-3 py-1 text-sm rounded-md border border-black bg-black text-white">
          All
        </button>
        {categories.map((category, i) => (
          <button
            key={category}
            className="px-3 py-1 text-sm rounded-md border border-black hover:bg-black hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-4 gap-5">
        {projects.map((project) => (
          <li key={project.id} className="relative border">
            <Link href={`/projects/${project.id}`}>
              <Image
                src={`/imgs/projects/amigo_signal/${project.cover}.png`}
                alt={`${project.title} 썸네일`}
                width={300}
                height={300}
                className="rounded-tl-md rounded-tr-md"
              />
              <div className="flex space-x-1 absolute top-3 left-3">
                {project.categories.map((category, i) => (
                  <span
                    key={i}
                    className="px-2 text-sm text-white bg-blue-200/75 rounded-md"
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
                className="relative flex align-middle justify-center text-slate-600 hover:underline after:content-[''] after:w-[1px] after:h-3/4 after:absolute after:top-1/2 after:-right-1.5 after:-translate-y-1/2 after:bg-slate-300"
                href={project.url}
                target="_blank"
                rel="noreferrer noopener"
              >
                <HiOutlineExternalLink className="text-lg" />
                <span className="text-sm">Visit</span>
              </a>
              <a
                className="flex align-middle justify-center text-slate-600 hover:underline"
                href={project.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                <TbBrandGithub className="text-lg" />
                <span className="text-sm">Github</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </WidthLayout>
  );
}
