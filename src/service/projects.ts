import fs from "fs";
import matter from "gray-matter";
import path from "path";

const projectsDirectory = path.join(process.cwd(), "data", "projects");

export type ProjectData = {
  id?: string;
  title: string;
  url: string;
  date: string;
  cover: string;
  imagePath: string;
  images?: string[];
  github: string;
  people?: string;
  categories: string[];
  description: string;
  skills: string[];
};
export function getSortedProjectsData() {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as {
        title: string;
        url: string;
        date: string;
        imagePath: string;
        cover: string;
        github: string;
        categories: string[];
        description: string;
        skills: string[];
      }),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getProjectData(id: string) {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const frontmatter = {
    title: data.title,
    url: data.url,
    date: data.date,
    imagePath: data.imagePath,
    cover: data.cover,
    images: data.images,
    github: data.github,
    people: data.people,
    categories: data.categories,
    description: data.description,
    skills: data.skills,
  };

  return {
    id,
    frontmatter,
    content,
  };
}
