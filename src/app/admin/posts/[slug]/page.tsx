"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Props = {
  params: { slug: string };
};

export default function EditPostPage({ params }: Props) {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const [form, setForm] = useState({
    title: "",
    coverTitle: "",
    date: "",
    category: "",
    published: true,
    content: "",
  });

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // 페이지 열릴 때 기존 데이터 불러오기
  useEffect(() => {
    fetch("/api/admin/posts")
      .then((res) => res.json())
      .then((posts) => {
        const post = posts.find((p: any) => p.slug === params.slug);
        if (post) {
          setForm({
            title: post.title,
            coverTitle: post.cover_title ?? "",
            date: post.date ? String(post.date).substring(0, 10) : "",
            category: post.category ?? "",
            published: post.published,
            content: post.content ?? "",
          });
        }
      });
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/posts/${params.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert("수정되었습니다!");
        router.push("/admin/posts");
      } else {
        const error = await res.json();
        console.error("수정 실패:", error);
        alert(`수정에 실패했습니다: ${error.error ?? "알 수 없는 오류"}`);
      }
    } catch (err) {
      console.error("네트워크 오류:", err);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">포스트 수정</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            placeholder="포스트 제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover Title</label>
          <input
            placeholder="커버 이미지에 표시될 제목"
            value={form.coverTitle}
            onChange={(e) => setForm({ ...form, coverTitle: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            list="category-options"
            placeholder="선택하거나 직접 입력"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border rounded p-2"
          />
          <datalist id="category-options">
            {categories.map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          <label htmlFor="published" className="text-sm font-medium">
            공개 여부
          </label>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium">Content</label>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">코드 테마:</span>
              <button
                type="button"
                onClick={() => setColorMode("light")}
                className={`px-3 py-1 rounded border ${colorMode === "light" ? "bg-black text-white" : "bg-white text-gray-600"}`}
              >
                Light
              </button>
              <button
                type="button"
                onClick={() => setColorMode("dark")}
                className={`px-3 py-1 rounded border ${colorMode === "dark" ? "bg-black text-white" : "bg-white text-gray-600"}`}
              >
                Dark
              </button>
            </div>
          </div>
          <div data-color-mode={colorMode}>
            <MDEditor
              value={form.content}
              onChange={(v) => setForm({ ...form, content: v || "" })}
              height={500}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            저장
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/posts")}
            className="border px-6 py-2 rounded hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
