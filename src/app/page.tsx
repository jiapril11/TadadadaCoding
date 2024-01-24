import dynamic from "next/dynamic";
import MainBanner from "./components/Home/MainBanner";
import RecentPosts from "./components/Home/RecentPosts";
import WidthLayout from "./components/WidthLayout";
// import TwinCarousel from "./components/Home/TwinCarousel";
const NoSSRCarousel = dynamic(() => import("./components/Home/TwinCarousel"), {
  ssr: false,
});

export default async function Home() {
  return (
    <>
      <MainBanner />
      <WidthLayout>
        <RecentPosts />
        <NoSSRCarousel />
      </WidthLayout>
    </>
  );
}
