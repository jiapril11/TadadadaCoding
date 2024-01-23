import Image from "next/image";
import { ITEM_HEIGHT, ProjectTypeCarousel } from "./TwinCarousel";

export default function SubCarouselItem({
  project,
}: {
  project: ProjectTypeCarousel;
}) {
  const { cover, tags } = project;
  const itemHeight = ITEM_HEIGHT;
  return (
    <div className={`relative w-full`} style={{ height: `${itemHeight}px` }}>
      <Image
        className="absolute bottom-0 w-full md:w-9/12"
        src={cover}
        alt={`${project.title}`}
        width="880"
        height="482"
      />
      <div className="hidden md:flex absolute top-16 left-10 flex-wrap gap-2 w-1/2 px-3 py-2 text-sm break-keep text-slate-500">
        {tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </div>
  );
}
