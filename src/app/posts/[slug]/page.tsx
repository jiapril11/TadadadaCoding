import React from "react";
import AdjacentPostCard from "@/app/components/Post/AdjacentPostCard";
import MarkdownViewer from "@/app/components/Post/MarkdownViewer";
import WidthLayout from "@/app/components/WidthLayout";
import { getPostData, getSortedPostsData } from "@/service/posts";
import DateNormal from "@/app/components/Posts/Date";
import ListBackBtns from "@/app/components/Posts/ListBackBtns";
import { Metadata } from "next";
import HeroTitle from "@/app/components/Post/HeroTitle";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const {
    frontmatter: { title },
  } = await getPostData(decodeURIComponent(slug));
  return {
    title,
    description: title + " 블로그 포스트",
    openGraph: {
      title: title,
      description: title + " 블로그 포스트",
    },
  };
}

export default async function PostPage({ params: { slug } }: Props) {
  const postData = await getPostData(decodeURIComponent(slug));
  const { frontmatter, content, next, prev } = postData;

  return (
    <article className="relative w-full pb-10 break-keep">
      <HeroTitle frontmatter={frontmatter} />
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

export async function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    slug: post.id,
  }));
}
