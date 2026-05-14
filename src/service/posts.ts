import path from "path";
import fs from "fs";
import matter from "gray-matter";
import sql from "@/lib/db";

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

// Date 객체 또는 문자열을 "YYYY-MM-DD" 형식으로 변환
function formatDate(date: any): string {
  if (date instanceof Date) return date.toISOString().split("T")[0];
  return String(date).substring(0, 10);
}

// Neon DB에서 포스트 목록 가져오기
export async function getSupabasePostsData() {
  const data = await sql`
      SELECT * FROM posts
      WHERE published = true
      ORDER BY date DESC
    `;

  // DB 컬럼명(snake_case)을 기존 PostData 형식(camelCase)으로 변환
  return data.map((post: any) => ({
    id: post.slug,
    title: post.title,
    coverTitle: post.cover_title,
    date: formatDate(post.date),
    category: post.category,
    published: post.published,
  }));
}

// MD + Neon DB 합친 전체 목록
export async function getAllPostsData() {
  const mdPosts = getSortedPostsData();
  const dbPosts = await getSupabasePostsData();

  // 두 배열을 합치고 날짜 최신순으로 정렬
  return [...dbPosts, ...mdPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 단일 포스트 조회 - MD에 없으면 Neon DB에서 찾기
export async function getPostDataById(id: string) {
  // 먼저 MD 파일에서 찾기
  try {
    return await getPostData(id);
  } catch {
    // MD 파일에 없으면 DB에서 찾기
    const data = await sql`
        SELECT * FROM posts WHERE slug = ${id}
      `;

    if (!data[0]) throw new Error("Post not found");

    const post = data[0];
    return {
      id: post.slug,
      frontmatter: {
        title: post.title,
        date: formatDate(post.date),
        coverTitle: post.cover_title,
        category: post.category,
      },
      content: post.content,
      next: null,
      prev: null,
    };
  }
}
