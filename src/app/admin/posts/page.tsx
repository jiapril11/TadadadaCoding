"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  published: boolean;
};

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/admin/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`"${slug}" 포스트를 삭제할까요?`)) return;

    await fetch(`/api/admin/posts/${slug}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((post) => post.slug !== slug));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + 새 포스트
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-white border rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">
                {post.date} · {post.category} ·{" "}
                {post.published ? "공개" : "비공개"}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/admin/posts/${post.slug}`)}
                className="text-blue-500 hover:underline text-sm"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(post.slug)}
                className="text-red-500 hover:underline text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <p className="text-gray-400 text-center py-20">
            작성된 포스트가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
