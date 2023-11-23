import React from "react";
import WidthLayout from "../components/WidthLayout";
import Cards from "../components/Posts/Cards";

export default async function PostsPage() {
  return (
    <WidthLayout>
      <h2>Posts</h2>
      <Cards />
    </WidthLayout>
  );
}
