import { getSortedPostsData } from "@/service/posts";
import MainBanner from "./components/Home/MainBanner";
import WidthLayout from "./components/WidthLayout";
import Link from "next/link";

export default async function Home() {
  const posts = getSortedPostsData(8);
  return (
    <>
      <MainBanner />
      <WidthLayout>
        <h2>Posts</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <p>{post.title}</p>
                <p>{post.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      </WidthLayout>
    </>
  );
}
