import React from "react";
import AdjacentPostCard from "@/app/components/Post/AdjacentPostCard";
import MarkdownViewer from "@/app/components/Post/MarkdownViewer";
import WidthLayout from "@/app/components/WidthLayout";
import { getPostData } from "@/service/posts";
import DateNormal from "@/app/components/Posts/Date";
import HeroImage from "@/app/components/Post/HeroImage";
import ListBackBtns from "@/app/components/Posts/ListBackBtns";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const postData = await getPostData(decodeURIComponent(slug));
  const { frontmatter, content, next, prev } = postData;

  return (
    <article className="relative w-full pb-10 break-keep">
      <HeroImage frontmatter={frontmatter} />
      <WidthLayout>
        <div className="mt-8 mb-16">
          <h1 className="mb-4 text-3xl text-center font-semibold">
            {frontmatter.title}
          </h1>
          <DateNormal dateString={frontmatter.date} />
        </div>

        <MarkdownViewer content={content} />

        <div className="flex flex-col sm:flex-row justify-between gap-3 lg:gap-5 mt-24">
          {prev && <AdjacentPostCard post={prev} type="prev" />}
          {next && <AdjacentPostCard post={next} type="next" />}
        </div>

        <ListBackBtns />
      </WidthLayout>
    </article>
  );
}
