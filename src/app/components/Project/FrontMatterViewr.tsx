import Image from "next/image";
import WidthLayout from "../WidthLayout";
import SingleCarousel from "./SingleCarousel";
import { HiOutlineExternalLink } from "react-icons/hi";
import { ProjectData } from "@/service/projects";

export default function FrontMatterViewr({
  frontmatter,
}: {
  frontmatter: ProjectData;
}) {
  const {
    title,
    url,
    date,
    images,
    github,
    people,
    description,
    skills,
    imagePath,
  } = frontmatter;

  return (
    <div className="bg-slate-100 py-10">
      <WidthLayout>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <SingleCarousel>
              {images!.map((image: string, i: number) => (
                <Image
                  key={i}
                  src={`/imgs/projects/${imagePath}/${image}`}
                  alt={`${title} 이미지`}
                  priority={i === 0 ? true : false}
                  width={600}
                  height={500}
                  className="mx-auto w-full max-w-[500px] lg:max-w-full h-auto max-h-[413px]"
                />
              ))}
            </SingleCarousel>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="flex items-center mb-1 text-xl font-semibold">
              {title}
              <div className="group relative">
                <a href={url} target="_blank" rel="noreferrer noopener">
                  <HiOutlineExternalLink className="ml-2 mr-4 text-md" />
                </a>
                <span className="absolute invisible group-hover:visible w-max text-xs top-1/2 -translate-y-1/2 left-full bg-slate-200 px-3 py-1 box-border rounded-md text-slate-500 after:absolute after:content-[''] after:-left-4 after:top-1/2 after:-translate-y-1/2 after:border-y-4 after:border-l-8 after:border-transparent after:border-r-8 after:border-r-slate-200">
                  Visit Site
                </span>
              </div>
            </h2>
            <div className="flex flex-col sm:flex-row sm:space-x-2 mb-4 text-sm font-semibold text-slate-500">
              <a
                href={github}
                className="hover:underline hover:underline-offset-2 hover:text-slate-600 underline"
                rel="noopener noreferrer"
              >
                Github
              </a>
              <span className='after:content-[""] w-0.5 h-3 translate-y-1/2 bg-slate-200 hidden sm:block'></span>
              <span>{date}</span>
              <span className='after:content-[""] w-0.5 h-3 translate-y-1/2 bg-slate-200 hidden sm:block'></span>
              <span>{people}</span>
            </div>
            <p className="mb-6 break-keep">{description}</p>
            <div>
              <div className="relative flex gap-2 mb-3">
                <span className="text-sm font-semibold">Skills</span>
                <span className="w-full h-px translate-y-2 bg-slate-300"></span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 box-border text-sm font-semibold bg-slate-300 bg-opacity-50 text-sky-800 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WidthLayout>
    </div>
  );
}
