import path from "path";
import fs from "fs";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "data", "posts");

export type PostData = {
  id?: string;
  title: string;
  date: string;
  coverTitle: string;
  category: string;
};

export function getSortedPostsData(start = 0, end?: number) {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as {
        title: string;
        date: string;
        coverTitle: string;
        category: string;
        published: true;
      }),
    };
  });

  return allPostsData
    .filter((post) => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(start, end ? end : allPostsData.length);
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const frontmatter = {
    title: data.title,
    date: data.date,
    coverTitle: data.coverTitle,
    category: data.category,
  };

  const postList = getSortedPostsData();
  const currPost = postList.find((post) => post.id === id);
  const index = postList.indexOf(currPost!);
  const next = index > 0 ? postList[index - 1] : null;
  const prev = index < postList.length - 1 ? postList[index + 1] : null;

  return {
    id,
    frontmatter,
    content,
    next,
    prev,
  };
}
