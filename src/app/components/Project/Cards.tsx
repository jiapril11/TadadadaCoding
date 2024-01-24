"use client";

import { ProjectData } from "@/service/projects";
import { selectedCategoryType } from "./List";
import Card from "./Card";

export default function Cards({
  projects,
  selectedCategory,
}: {
  projects: ProjectData[];
  selectedCategory: selectedCategoryType;
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10 sm:mb-16">
      {projects
        .filter((project) =>
          selectedCategory
            ? project.categories.includes(selectedCategory)
            : true
        )
        .map((project) => (
          <Card key={project.id} project={project} />
        ))}
    </ul>
  );
}
