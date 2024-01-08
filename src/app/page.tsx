import PostCarousel from "./components/Home/Carousel";
import MainBanner from "./components/Home/MainBanner";
import WidthLayout from "./components/WidthLayout";

export default async function Home() {
  return (
    <>
      <MainBanner />
      <WidthLayout>
        <PostCarousel />
      </WidthLayout>
    </>
  );
}
