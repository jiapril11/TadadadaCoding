import React from "react";
import WidthLayout from "../components/WidthLayout";
import { getSortedPostsData } from "@/service/posts";
import Link from "next/link";

export default async function PostsPage() {
  const posts = getSortedPostsData();
  return (
    <WidthLayout>
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
  );
}
