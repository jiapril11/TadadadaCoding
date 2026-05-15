import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex items-center gap-6">
        <Link href="/admin" className="font-bold text-lg">
          Admin
        </Link>
        <Link href="/admin/posts" className="text-gray-600 hover:text-black">
          Posts
        </Link>
        <Link href="/admin/projects" className="text-gray-600 hover:text-black">
          Projects
        </Link>
        <Link
          href="/api/auth/signout"
          className="ml-auto text-red-500 hover:text-red-700"
        >
          로그아웃
        </Link>
      </nav>
      <main className="max-w-5xl mx-auto p-8">{children}</main>
    </div>
  );
}
