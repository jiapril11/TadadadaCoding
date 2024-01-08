import SingleCarousel from "@/app/components/Project/SingleCarousel";
import WidthLayout from "@/app/components/WidthLayout";
import { getProjectData } from "@/service/projects";
import Image from "next/image";
import Markdown from "react-markdown";
import { HiOutlineExternalLink } from "react-icons/hi";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProjectPage({ params: { slug } }: Props) {
  const project = await getProjectData(slug);
  const {
    title,
    url,
    date,
    cover,
    images,
    github,
    people,
    categories,
    description,
    skills,
  } = project.frontmatter;

  return (
    <section>
      <div className="bg-slate-100 py-10">
        <WidthLayout>
          <div className="flex gap-6">
            <div className="w-1/2">
              <SingleCarousel>
                {images.map((image: string, i: number) => (
                  <Image
                    key={i}
                    src={`/imgs/projects/amigo_signal/${image}.png`}
                    alt={`${title} 이미지`}
                    width={600}
                    height={300}
                    className="mx-auto"
                  />
                ))}
              </SingleCarousel>
            </div>
            <div>
              <h2 className="flex items-center mb-1 text-xl font-semibold">
                {title}
                <div className="group relative">
                  <a href={url} target="_blank" rel="noreferrer noopener">
                    <HiOutlineExternalLink className="ml-2 mr-4 text-md" />
                  </a>
                  <span className="absolute invisible group-hover:visible w-max text-xs top-1/2 -translate-y-1/2 left-full bg-slate-200 px-3 py-1 rounded-md text-slate-500 after:absolute after:content-[''] after:-left-4 after:top-1/2 after:-translate-y-1/2 after:border-y-4 after:border-l-8 after:border-transparent after:border-r-8 after:border-r-slate-200">
                    Visit Site
                  </span>
                </div>
              </h2>
              <div className="flex space-x-2 mb-4 text-sm font-semibold text-slate-500">
                <a
                  href={github}
                  className="hover:underline hover:underline-offset-2 hover:text-slate-600"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                <span className='after:content-[""] w-0.5 h-3 translate-y-1/2 bg-slate-200'></span>
                <span>{date}</span>
                <span className='after:content-[""] w-0.5 h-3 translate-y-1/2 bg-slate-200'></span>
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
                      className="px-2 text-sm font-semibold bg-slate-300 bg-opacity-50 text-sky-800 rounded"
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
      <WidthLayout>
        <div className="prose max-w-full pt-10 pb-20">
          <Markdown
            components={{
              code(props) {
                return (
                  <code
                    className={`px-1 bg-sky-100 before:content-[''] after:content-['']`}
                  >
                    {props.children}
                  </code>
                );
              },
              h2(props) {
                return (
                  <h2 className="text-lg font-semibold">{props.children}</h2>
                );
              },
              h3(props) {
                return (
                  <h3 className="text-base font-semibold">{props.children}</h3>
                );
              },
            }}
          >
            {project.content}
          </Markdown>
        </div>
      </WidthLayout>
    </section>
  );
}
