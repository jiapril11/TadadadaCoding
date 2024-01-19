import PostCarousel from "./components/Home/Carousel";
import MainBanner from "./components/Home/MainBanner";
import RecentPosts from "./components/Home/RecentPosts";
import Lists from "./components/Posts/Lists";
import WidthLayout from "./components/WidthLayout";

export default async function Home() {
  return (
    <>
      <MainBanner />
      <WidthLayout>
        <RecentPosts />
      </WidthLayout>
    </>
  );
}
