import { getProjectData, getSortedProjectsData } from "@/service/projects";
import FrontMatterViewr from "@/app/components/Project/FrontMatterViewr";
import MarkdownViewer from "@/app/components/Project/MarkdownViewer";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const {
    frontmatter: { title, description },
  } = await getProjectData(slug);
  return {
    title,
    description,
    openGraph: {
      title: title,
      description: title + " 블로그 포스트",
    },
  };
}

export default async function ProjectPage({ params: { slug } }: Props) {
  const project = await getProjectData(slug);

  return (
    <section>
      <FrontMatterViewr frontmatter={project.frontmatter} />
      <MarkdownViewer content={project.content} />
    </section>
  );
}

export async function generateStaticParams() {
  const posts = getSortedProjectsData();

  return posts.map((post) => ({
    slug: post.id,
  }));
}
