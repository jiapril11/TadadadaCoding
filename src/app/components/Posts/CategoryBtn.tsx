"use client";

import { usePostsCategoryStore } from "@/store/posts/postsCategoryStore";

export default function CategoryBtn({ categories }: { categories: string[] }) {
  const { setCategory, currentCategory } = usePostsCategoryStore();

  return (
    <ul className="space-y-2 pl-2">
      <li className="flex items-center flex-grow font-medium group">
        <button onClick={() => setCategory("All")}>All</button>
        <span
          className={`${
            currentCategory === "All"
              ? "block ml-1"
              : "hidden group-hover:block group-hover:ml-2 group-hover:animate-ping group-hover:duration-[2500]"
          } w-2 h-2 bg-sky-400 rounded-full`}
        ></span>
      </li>
      {categories.map((category) => (
        <li
          key={category}
          className="flex items-center flex-grow font-medium group"
        >
          <button onClick={() => setCategory(category)}>{category}</button>
          <span
            className={`${
              currentCategory === category
                ? "block ml-1"
                : "hidden group-hover:block group-hover:ml-2 group-hover:animate-ping group-hover:duration-[2500]"
            } w-2 h-2 bg-sky-400 rounded-full`}
          ></span>
        </li>
      ))}
    </ul>
  );
}
