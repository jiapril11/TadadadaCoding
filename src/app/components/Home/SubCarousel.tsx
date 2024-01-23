import SubCarouselItem from "./SubCarouselItem";
import { ProjectTypeCarousel } from "./TwinCarousel";

export default function SubCarousel({
  projects,
  activeIndex,
}: {
  projects: ProjectTypeCarousel[];
  activeIndex: number;
}) {
  return (
    <div className="absolute bottom-0 left-0 overflow-hidden w-full flex flex-col justify-center">
      <div
        style={{
          transform: `translateX(-${(activeIndex * 100) / projects.length}%)`,
          width: `${projects.length * 100}%`,
        }}
        className={`relative flex flex-shrink-0 transition-transform duration-500`}
      >
        {projects.map((project, index) => {
          return <SubCarouselItem key={index} project={project} />;
        })}
      </div>
    </div>
  );
}
