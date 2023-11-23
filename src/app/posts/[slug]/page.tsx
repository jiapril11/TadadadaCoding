import FrontMatterViewr from "@/app/components/Post/FrontMatterViewer";
import MarkdownViewer from "@/app/components/Post/MarkdownViewer";
import { getPostData } from "@/service/posts";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const postData = await getPostData(decodeURIComponent(slug));
  const { frontmatter } = postData;
  const { content, id } = postData;

  return (
    <article className="prose w-full min-w-[360px] max-w-[1200px] mx-auto pb-40">
      <FrontMatterViewr frontmatter={frontmatter} />
      <MarkdownViewer content={content} />
    </article>
  );
}
