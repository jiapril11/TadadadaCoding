"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type Props = {
  params: { slug: string };
};

export default function EditProjectPage({ params }: Props) {
  const router = useRouter();
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const [form, setForm] = useState({
    title: "",
    url: "",
    date: "",
    imagePath: "",
    cover: "",
    images: "",
    github: "",
    people: "",
    categories: "",
    description: "",
    skills: "",
    content: "",
  });

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((projects) => {
        const project = projects.find((p: any) => p.slug === params.slug);
        if (project) {
          setForm({
            title: project.title ?? "",
            url: project.url ?? "",
            date: project.date ?? "",
            imagePath: project.image_path ?? "",
            cover: project.cover ?? "",
            images: project.images?.join(", ") ?? "",
            github: project.github ?? "",
            people: project.people ?? "",
            categories: project.categories?.join(", ") ?? "",
            description: project.description ?? "",
            skills: project.skills?.join(", ") ?? "",
            content: project.content ?? "",
          });
        }
      });
  }, [params.slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/admin/projects/${params.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images: form.images ? form.images.split(",").map((s) => s.trim()) : [],
          categories: form.categories
            ? form.categories.split(",").map((s) => s.trim())
            : [],
          skills: form.skills ? form.skills.split(",").map((s) => s.trim()) : [],
        }),
      });

      if (res.ok) {
        alert("수정되었습니다!");
        router.push("/admin/projects");
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
      <h1 className="text-3xl font-bold mb-8">프로젝트 수정</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            placeholder="프로젝트 이름"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            placeholder="배포 URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
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
          <label className="block text-sm font-medium mb-1">Image Path</label>
          <input
            placeholder="예: /images/projects/my-project"
            value={form.imagePath}
            onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cover 이미지 파일명</label>
          <input
            placeholder="예: cover.png"
            value={form.cover}
            onChange={(e) => setForm({ ...form, cover: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Images (쉼표로 구분)
          </label>
          <input
            placeholder="예: screenshot1.png, screenshot2.png"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">GitHub URL</label>
          <input
            placeholder="GitHub 저장소 URL"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">People</label>
          <input
            placeholder="예: 개인 / 팀"
            value={form.people}
            onChange={(e) => setForm({ ...form, people: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Categories (쉼표로 구분)
          </label>
          <input
            placeholder="예: React, Next.js"
            value={form.categories}
            onChange={(e) => setForm({ ...form, categories: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            placeholder="프로젝트 설명"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded p-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Skills (쉼표로 구분)
          </label>
          <input
            placeholder="예: TypeScript, Tailwind CSS"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            className="w-full border rounded p-2"
          />
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
            onClick={() => router.push("/admin/projects")}
            className="border px-6 py-2 rounded hover:bg-gray-100"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
