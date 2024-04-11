import React from "react";
import WidthLayout from "../components/WidthLayout";
import PostsWrapper from "../components/Posts/PostsWrapper";
import { getSortedPostsData } from "@/service/posts";
import { Kreon } from "next/font/google";
import ViewButton from "../components/Posts/ViewButton";
import CategoryBtn from "../components/Posts/CategoryBtn";
import CategorySelect from "../components/Posts/CategorySelect";
import { Metadata } from "next";

const kreon = Kreon({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IT Posts",
  description: "Posts about IT and Coding",
  openGraph: {
    title: "IT Posts",
    description: "Posts about IT and Coding",
  },
};

export default function PostsPage() {
  const posts = getSortedPostsData();
  const categories = [...new Set(posts.map((post) => post.category))];

  return (
    <WidthLayout>
      <article className="pt-10 pb-20">
        <div className="grid grid-cols-7 lg:gap-3 xl:gap-6 transition">
          <div className="col-span-7 lg:col-span-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className={`${kreon.className} font-semibold text-2xl`}>
                Posts
              </h2>
              <ViewButton />
            </div>
            <div className="lg:hidden mb-3">
              <CategorySelect categories={categories} />
            </div>
            <div>
              <PostsWrapper posts={posts} categories={categories} />
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1 lg:border-s lg:pl-2 xl:pl-3">
            <h3 className="text-gray-300 text-xl font-semibold mb-5">
              Category
            </h3>
            <CategoryBtn categories={categories} />
          </div>
        </div>
      </article>
    </WidthLayout>
  );
}
