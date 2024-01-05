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
    <ul className="grid grid-cols-4 gap-5">
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
