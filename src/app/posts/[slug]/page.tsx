import AdjacentPostCard from "@/app/components/Post/AdjacentPostCard";
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
  const { frontmatter, content, id, next, prev } = postData;

  return (
    <article className="prose relative w-full min-w-[360px] max-w-[1200px] mx-auto pb-24">
      <FrontMatterViewr frontmatter={frontmatter} />
      <MarkdownViewer content={content} />
      <div className="flex justify-between gap-5 mt-24">
        {prev && <AdjacentPostCard post={prev} type="prev" />}
        {next && <AdjacentPostCard post={next} type="next" />}
      </div>
    </article>
  );
}
