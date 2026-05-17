export const dynamic = "force-dynamic";

import { getAllProjectsData } from "@/service/projects";
import { Kreon } from "next/font/google";
import { Metadata } from "next";
import WidthLayout from "@/app/components/WidthLayout";
import List from "@/app/components/Project/List";

export const metadata: Metadata = {
  title: "My Projects",
  description: "Projects using React.js Next.js Javascript Typescript",
  openGraph: {
    title: "My Projects",
    description: "Projects using React.js Next.js Javascript Typescript",
  },
};

const kreon = Kreon({ subsets: ["latin"] });

export default async function ProjectsPage() {
  const projects = await getAllProjectsData();
  const categories = [
    ...new Set(projects.map((project) => project.categories).flat()),
  ];
  return (
    <WidthLayout>
      <h2 className={`${kreon.className} mt-6 mb-5 font-semibold text-2xl`}>
        Projects
      </h2>
      <List categories={categories} projects={projects} />
    </WidthLayout>
  );
}
