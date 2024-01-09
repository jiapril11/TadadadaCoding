import { getProjectData } from "@/service/projects";
import FrontMatterViewr from "@/app/components/Project/FrontMatterViewr";
import MarkdownViewer from "@/app/components/Project/MarkdownViewer";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProjectPage({ params: { slug } }: Props) {
  const project = await getProjectData(slug);

  return (
    <section>
      <FrontMatterViewr frontmatter={project.frontmatter} />
      <MarkdownViewer content={project.content} />
    </section>
  );
}
