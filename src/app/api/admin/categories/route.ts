import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { getSortedPostsData } from "@/service/posts";
import sql from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // MD 파일 카테고리
  const mdPosts = getSortedPostsData();
  const mdCategories = mdPosts.map((post) => post.category).filter(Boolean);

  // DB 카테고리
  const dbPosts = await sql`SELECT category FROM posts WHERE category IS NOT NULL`;
  const dbCategories = dbPosts.map((post: any) => post.category).filter(Boolean);

  // 중복 제거 후 정렬
  const categories = [...new Set([...dbCategories, ...mdCategories])].sort();

  return NextResponse.json(categories);
}
