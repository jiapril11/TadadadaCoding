"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  slug: string;
  title: string;
  date: string;
  categories: string[];
};

export default function AdminProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`"${slug}" 프로젝트를 삭제할까요?`)) return;

    await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((project) => project.slug !== slug));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + 새 프로젝트
        </Link>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="bg-white border rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{project.title}</h2>
              <p className="text-sm text-gray-500">
                {project.date} · {project.categories?.join(", ")}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/admin/projects/${project.slug}`)}
                className="text-blue-500 hover:underline text-sm"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(project.slug)}
                className="text-red-500 hover:underline text-sm"
              >
                삭제
              </button>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-gray-400 text-center py-20">
            작성된 프로젝트가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
