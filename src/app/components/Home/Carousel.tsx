import { getSortedPostsData } from "@/service/posts";
import Card from "../Posts/Card";
import MultiCarousel from "./MultiCarousel";

export default function Carousel() {
  const posts = getSortedPostsData(8);
  return (
    <section className="py-10">
      <h2 className="mb-5 text-xl font-bold">Recent Posts</h2>
      <MultiCarousel>
        {posts.map((post) => (
          <Card post={post} key={post.id} dateType="distance" />
        ))}
      </MultiCarousel>
    </section>
  );
}
