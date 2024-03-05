import { PostData } from "@/service/posts";
import List from "./List";
import Card from "./Card";

export default function Lists({
  view,
  posts,
  selectedCategory,
}: {
  view: string;
  posts: PostData[];
  selectedCategory?: string;
}) {
  return (
    <ul
      className={`${
        view === "list"
          ? "divide-y divide-black border-b border-black"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10 sm:mb-16"
      }`}
    >
      {posts
        .filter((post) =>
          selectedCategory === "All" || selectedCategory === undefined
            ? true
            : post.category === selectedCategory
        )
        .map((post, index, postsLength) =>
          view === "list" ? (
            <List key={post.id} post={post} />
          ) : (
            <Card key={post.id} post={post} dateType="normal" />
          )
        )}
    </ul>
  );
}
