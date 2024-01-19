import { PostData } from "@/service/posts";
import List from "./List";

export default function Lists({
  posts,
}: {
  view: string;
  posts: PostData[];
  selectedCategory?: string;
}) {
  return (
    <ul className={`divide-y divide-black`}>
      {posts.map((post) => (
        <List key={post.id} post={post} />
      ))}
    </ul>
  );
}
