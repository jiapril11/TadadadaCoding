"use client";

import { PostData } from "@/service/posts";
import List from "./List";
import { useEffect, useState } from "react";

export default function ListCards({
  posts,
  selectedCategory,
}: {
  view: string;
  posts: PostData[];
  selectedCategory?: string;
}) {
  const COUNT_POST = 10;

  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(
    posts.filter((post) =>
      selectedCategory === "All" || selectedCategory === undefined
        ? true
        : post.category === selectedCategory
    )
  );

  const [renderPosts, setRenderPosts] = useState<PostData[]>(
    filteredPosts.slice(0, COUNT_POST)
  );

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: Math.ceil(filteredPosts.length / COUNT_POST),
  });

  useEffect(() => {
    setFilteredPosts(() =>
      posts.filter((post) =>
        selectedCategory === "All" || selectedCategory === undefined
          ? true
          : post.category === selectedCategory
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  useEffect(() => {
    setRenderPosts(filteredPosts.slice(0, COUNT_POST));
    setPageInfo((_) => {
      return {
        currentPage: 1,
        totalPage: Math.ceil(filteredPosts.length / COUNT_POST),
      };
    });
  }, [filteredPosts]);

  useEffect(() => {
    setRenderPosts(() => {
      return [
        ...filteredPosts.slice(
          (pageInfo.currentPage - 1) * COUNT_POST,
          (pageInfo.currentPage - 1 + 1) * COUNT_POST
        ),
      ];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo.currentPage]);

  const handlePage = (num: number) => {
    setPageInfo((prev) => {
      return {
        ...prev,
        currentPage: num,
      };
    });
  };
  return (
    <>
      <ul className="divide-y divide-black border-b border-black">
        {renderPosts.map((post) => (
          <List key={post.id} post={post} />
        ))}
      </ul>
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: pageInfo.totalPage }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePage(i + 1)}
            className={pageInfo.currentPage === i + 1 ? "text-sky-400" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
