import sql from "@/lib/db";
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

// Neon DB에서 프로젝트 목록 가져오기
export async function getDbProjectsData() {
  const data = await sql`
      SELECT * FROM projects ORDER BY date DESC
    `;

  // DB 컬럼명(snake_case)을 기존 ProjectData 형식(camelCase)으로 변환
  return data.map((project: any) => ({
    id: project.slug,
    title: project.title,
    url: project.url,
    date: project.date,
    imagePath: project.image_path,
    cover: project.cover,
    images: project.images,
    github: project.github,
    people: project.people,
    categories: project.categories,
    description: project.description,
    skills: project.skills,
  }));
}

// MD + Neon DB 합친 전체 목록
export async function getAllProjectsData() {
  const mdProjects = getSortedProjectsData();
  const dbProjects = await getDbProjectsData();

  return [...dbProjects, ...mdProjects].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

// 단일 프로젝트 조회 - MD에 없으면 Neon DB에서 찾기
export async function getProjectDataById(id: string) {
  // 먼저 MD 파일에서 찾기
  try {
    return await getProjectData(id);
  } catch {
    // MD 파일에 없으면 DB에서 찾기
    const data = await sql`
        SELECT * FROM projects WHERE slug = ${id}
      `;

    if (!data[0]) throw new Error("Project not found");

    const project = data[0];
    return {
      id: project.slug,
      frontmatter: {
        title: project.title,
        url: project.url,
        date: project.date,
        imagePath: project.image_path,
        cover: project.cover,
        images: project.images,
        github: project.github,
        people: project.people,
        categories: project.categories,
        description: project.description,
        skills: project.skills,
      },
      content: project.content,
    };
  }
}
