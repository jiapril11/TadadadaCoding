import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

export default function CarouselBtns({
  activeIndexMain,
  activeIndexSub,
  updateIndexMain,
  updateIndexSub,
  projectsLength,
}: {
  activeIndexMain: number;
  activeIndexSub: number;
  updateIndexMain: (newIndex: number) => void;
  updateIndexSub: (newIndex: number) => void;
  projectsLength: number;
}) {
  return (
    <div className="absolute flex items-center gap-1 bottom-10 right-5">
      <button
        className={`flex items-center justify-center w-10 h-10 bg-black ${
          activeIndexSub === 0 && "opacity-10 cursor-not-allowed"
        }`}
        onClick={() => {
          updateIndexMain(activeIndexMain - 1);
          updateIndexSub(activeIndexSub - 1);
        }}
      >
        <MdArrowBackIos className="text-lg fill-white" />
      </button>
      <button
        className={`flex items-center justify-center w-10 h-10 bg-black ${
          activeIndexSub === projectsLength - 1 &&
          "opacity-10 cursor-not-allowed"
        }`}
        onClick={() => {
          updateIndexMain(activeIndexMain + 1);
          updateIndexSub(activeIndexSub + 1);
        }}
      >
        <MdArrowForwardIos className="text-lg fill-white" />
      </button>
    </div>
  );
}
