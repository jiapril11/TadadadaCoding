import SingleCarousel from "@/app/components/Project/SingleCarousel";
import WidthLayout from "@/app/components/WidthLayout";
import { getProjectData } from "@/service/projects";
import Image from "next/image";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
} from "react";

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
    <WidthLayout>
      <div className="flex">
        <div className="w-1/3 p-2">
          <SingleCarousel>
            {images.map((image: string, i: number) => (
              <Image
                key={i}
                src={`/imgs/projects/amigo_signal/${image}.png`}
                alt={`${title} 이미지`}
                width={300}
                height={300}
                className="mx-auto"
              />
            ))}
          </SingleCarousel>
        </div>
        <div>
          <h2>
            <a href={url} target="_blank" rel="noreferrer noopener">
              {title}
            </a>
          </h2>
          <div className="flex space-x-1">
            <a href={github}>Github</a>
            <span>{date}</span>
            <span>{people}</span>
          </div>
          <p>{description}</p>
          <div className="flex flex-wrap space-x-1">
            {skills.map((skill: string, i: number) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
      <div>content</div>
    </WidthLayout>
  );
}
