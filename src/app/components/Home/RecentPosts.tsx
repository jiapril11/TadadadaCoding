import Lists from "./Lists";
import { getSortedPostsData } from "@/service/posts";
import Heading2 from "./Heading2";

export default function RecentPosts() {
  const posts = getSortedPostsData(0, 6);
  return (
    <>
      <div className="pt-10 pb-20">
        <Heading2 title="Recent Posts" link="/posts" />
        <Lists posts={posts} view={"list"} />
      </div>
    </>
  );
}
