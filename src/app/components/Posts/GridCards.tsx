"use client";

import { PostData } from "@/service/posts";
import Card from "./Card";
import { useCallback, useEffect, useState } from "react";
import PropagateLoaderSpinner from "../Common/PropagateLoaderSpinner";

export default function GridCards({
  posts,
  selectedCategory,
}: {
  view: string;
  posts: PostData[];
  selectedCategory?: string;
}) {
  const COUNT_POST = 12;

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

  const [isLoading, setIsLoading] = useState(false);

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

  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting) {
        setPageInfo((prev) => {
          if (prev.totalPage > prev.currentPage) {
            return {
              ...prev,
              currentPage: prev.currentPage + 1,
            };
          }
          return prev;
        });
      }
    },
    []
  );

  useEffect(() => {
    if (
      pageInfo.currentPage !== 1 &&
      pageInfo.currentPage <= pageInfo.totalPage
    ) {
      setTimeout(() => {
        setRenderPosts((prev) => {
          return [
            ...prev,
            ...filteredPosts.slice(
              (pageInfo.currentPage - 1) * COUNT_POST,
              (pageInfo.currentPage - 1 + 1) * COUNT_POST
            ),
          ];
        });
        if (isLoading) setIsLoading(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageInfo.currentPage]);

  useEffect(() => {
    if (renderPosts.length < filteredPosts.length) {
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1,
      root: null,
    });
    target && observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, target]);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-10 sm:mb-16">
        {renderPosts.map((post) => (
          <Card key={post.id} post={post} dateType="normal" />
        ))}
      </ul>
      <div ref={setTarget} className="h-5 flex justify-center">
        {isLoading && <PropagateLoaderSpinner />}
      </div>
    </>
  );
}
