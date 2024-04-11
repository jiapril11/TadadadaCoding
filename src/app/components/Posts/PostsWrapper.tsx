"use client";

import { PostData } from "@/service/posts";
import { useViewStore } from "@/store/posts/viewStore";
import { usePostsCategoryStore } from "@/store/posts/postsCategoryStore";
import GridCards from "./GridCards";
import ListCards from "./ListCards";

export default function PostsWrapper({
  posts,
}: {
  posts: PostData[];
  categories: string[];
}) {
  const { view } = useViewStore();
  const { currentCategory } = usePostsCategoryStore();
  return (
    <>
      {view === "grid" ? (
        <GridCards
          posts={posts}
          view={view}
          selectedCategory={currentCategory}
        />
      ) : (
        <ListCards
          posts={posts}
          view={view}
          selectedCategory={currentCategory}
        />
      )}
    </>
  );
}
