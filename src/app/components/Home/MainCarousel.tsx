import MainCarouselItem from "./MainCarouselItem";
import { ProjectTypeCarousel } from "./TwinCarousel";

export default function MainCarousel({
  projects,
  activeIndex,
}: {
  projects: ProjectTypeCarousel[];
  activeIndex: number;
}) {
  return (
    <div className="overflow-hidden w-full flex flex-col justify-center">
      <div
        style={{
          transform: `translateX(${(-activeIndex * 100) / projects.length}%)`,
          width: `${projects.length * 100}%`,
        }}
        className={`relative flex flex-row-reverse flex-shrink-0 transition-transform duration-500 `}
      >
        {projects.map((project, index) => {
          return <MainCarouselItem key={index} project={project} />;
        })}
      </div>
    </div>
  );
}
