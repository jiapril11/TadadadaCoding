"use client";

import { useViewStore } from "@/store/posts/viewStore";
import { FaList } from "react-icons/fa";
import { HiViewGrid } from "react-icons/hi";

export default function ViewButton() {
  const { changeToGridView, changeToListView } = useViewStore();
  return (
    <div className="flex items-center gap-2">
      <button
        className="p-1 rounded-sm group border"
        onClick={() => changeToGridView()}
      >
        <HiViewGrid className="text-xl transition-transform group-hover:scale-110" />
      </button>
      <button
        className="p-1 rounded-sm group border"
        onClick={() => changeToListView()}
      >
        <FaList className="text-xl transition-transform group-hover:scale-110" />
      </button>
    </div>
  );
}
