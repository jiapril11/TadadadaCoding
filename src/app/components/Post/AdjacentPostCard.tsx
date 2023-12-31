import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  post: { id: string; title: string; date: string; cover: string } | null;
  type: "next" | "prev";
};

export default function AdjacentPostCard({ post, type }: Props) {
  const { id, title } = post!;
  return (
    <>
      {
        <Link
          href={`/posts/${id}`}
          className="group w-full px-3 py-6 no-underline  bg-gray-100 rounded-md shadow-sm hover:shadow-md transition"
        >
          <div
            className={`flex gap-3 flex-wrap items-center ${
              type === "next" && "justify-end text-right"
            }`}
          >
            {type === "prev" && (
              <div>
                <IoIosArrowBack className="text-4xl text-gray-300 group-hover:text-gray-600 transition" />
              </div>
            )}
            <div className="flex flex-col">
              <p className="m-0 text-gray-500 text-sm">
                {type === "prev" ? "이전 글" : "다음 글"}
              </p>
              <p className="m-0 text-lg mt-1">{title}</p>
            </div>

            {type === "next" && (
              <div>
                <IoIosArrowForward className="text-4xl text-gray-300 group-hover:text-gray-600 transition" />
              </div>
            )}
          </div>
        </Link>
      }
    </>
  );
}
