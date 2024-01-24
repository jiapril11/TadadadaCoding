"use client";

import { ProjectData } from "@/service/projects";
import { useState } from "react";
import CategoryButtons from "./CategoryButtons";
import Cards from "./Cards";

export type selectedCategoryType = undefined | string;

export default function List({
  categories,
  projects,
}: {
  categories: string[];
  projects: ProjectData[];
}) {
  const [selectedCategory, setSelectedCategory] =
    useState<selectedCategoryType>(undefined);
  const handleCategory = (category: string) => {
    category === "All"
      ? setSelectedCategory(undefined)
      : setSelectedCategory(category);
  };
  return (
    <>
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategory={handleCategory}
      />
      <Cards projects={projects} selectedCategory={selectedCategory} />
    </>
  );
}
