"use client";
import { PostData } from "@/service/posts";
import Lists from "./Lists";
import { useViewStore } from "@/store/posts/viewStore";
import { usePostsCategoryStore } from "@/store/posts/postsCategoryStore";

export default function ListWrapper({
  posts,
}: {
  posts: PostData[];
  categories: string[];
}) {
  const { view } = useViewStore();
  const { currentCategory } = usePostsCategoryStore();
  return (
    <>
      <Lists posts={posts} view={view} selectedCategory={currentCategory} />
    </>
  );
}
