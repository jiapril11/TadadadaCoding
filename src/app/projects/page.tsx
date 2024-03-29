import WidthLayout from "../components/WidthLayout";
import { getSortedProjectsData } from "@/service/projects";
import List from "../components/Project/List";
import { Kreon } from "next/font/google";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
  description: "Projects using React.js Next.js Javascript Typescript",
  openGraph: {
    title: "My Projects",
    description: "Projects using React.js Next.js Javascript Typescript",
  },
};

const kreon = Kreon({ subsets: ["latin"] });

export default function ProjectsPage() {
  const projects = getSortedProjectsData();
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
