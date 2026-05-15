import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">대시보드</h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          href="/admin/posts"
          className="bg-white border rounded-lg p-8 hover:shadow-md transition
  text-center"
        >
          <h2 className="text-xl font-semibold mb-2">Posts</h2>
          <p className="text-gray-500">포스트 관리</p>
        </Link>

        <Link
          href="/admin/projects"
          className="bg-white border rounded-lg p-8 hover:shadow-md transition
  text-center"
        >
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <p className="text-gray-500">프로젝트 관리</p>
        </Link>
      </div>
    </div>
  );
}
