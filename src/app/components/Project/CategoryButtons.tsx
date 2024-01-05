import { selectedCategoryType } from "./List";

export default function CategoryButtons({
  categories,
  selectedCategory,
  handleCategory,
}: {
  categories: string[];
  selectedCategory: selectedCategoryType;
  handleCategory: (category: string) => void;
}) {
  const buttonStyle =
    "px-3 py-1 text-sm rounded-md border border-black hover:bg-black hover:text-white";
  const activeButtonStyle = "bg-black text-white";

  return (
    <div className="flex space-x-2 mb-5">
      <button
        onClick={() => {
          handleCategory("All");
        }}
        className={`${buttonStyle} ${
          selectedCategory === undefined && activeButtonStyle
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          onClick={() => handleCategory(category)}
          key={category}
          className={`${buttonStyle} ${
            selectedCategory === category && activeButtonStyle
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
