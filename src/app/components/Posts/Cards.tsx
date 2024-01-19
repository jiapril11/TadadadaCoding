import { getSortedPostsData } from "@/service/posts";
import React from "react";
import Card from "./Card";

export default function Cards() {
  const posts = getSortedPostsData();
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mb-10 sm:mb-16">
      {posts.map((post) => (
        <Card post={post} key={post.id} dateType="normal" />
      ))}
    </ul>
  );
}
