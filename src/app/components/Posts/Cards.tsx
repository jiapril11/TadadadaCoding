import { getSortedPostsData } from "@/service/posts";
import React from "react";
import Card from "./Card";

export default function Cards() {
  const posts = getSortedPostsData();
  return (
    <ul className="grid grid-cols-4 gap-5">
      {posts.map((post) => (
        <Card post={post} key={post.id} dateType="normal" />
      ))}
    </ul>
  );
}
