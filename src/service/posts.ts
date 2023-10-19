import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "data", "posts");

export function getSortedPostsData(num?: number) {
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
      }),
    };
  });

  return allPostsData
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, num ? num : allPostsData.length);
}

// export function getAllPostIds() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   return fileNames.map((fileName) => {
//     return {
//       params: {
//         id: fileName.replace(/\.md$/, ""),
//       },
//     };
//   });
// }

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processdContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processdContent.toString();

  return {
    id,
    contentHtml,
    ...(matterResult.data as {
      title: string;
      date: string;
    }),
  };
}
