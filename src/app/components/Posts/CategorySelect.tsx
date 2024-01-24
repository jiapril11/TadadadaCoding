"use client";

import { usePostsCategoryStore } from "@/store/posts/postsCategoryStore";
import { Select } from "antd";

export default function CategorySelect({
  categories,
}: {
  categories: string[];
}) {
  const { setCategory, currentCategory } = usePostsCategoryStore();
  const handleChange = (value: string) => {
    setCategory(value);
  };
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="w-full">
      <Select
        defaultValue={currentCategory}
        className="w-full"
        onChange={handleChange}
        options={[{ value: "All", label: "All" }, ...categoryOptions]}
      />
    </div>
  );
}
