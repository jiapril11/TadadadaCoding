import Link from "next/link";
import { HiOutlinePlusSm } from "react-icons/hi";
import Lists from "./Lists";
import { getSortedPostsData } from "@/service/posts";

export default function RecentPosts() {
  const posts = getSortedPostsData(8);
  return (
    <>
      <div className="pt-10 pb-20">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-medium">Recent Posts</h2>
          <Link
            href={"/posts"}
            className="flex items-center gap-0.5 font-semibold hover:underline"
          >
            <HiOutlinePlusSm />
            more
          </Link>
        </div>
        <Lists posts={posts} view={"list"} />
      </div>
    </>
  );
}
