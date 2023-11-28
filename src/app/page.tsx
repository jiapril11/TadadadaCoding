import Carousel from "./components/Home/Carousel";
import MainBanner from "./components/Home/MainBanner";
import Cards from "./components/Posts/Cards";
import WidthLayout from "./components/WidthLayout";

export default async function Home() {
  return (
    <>
      <MainBanner />
      <WidthLayout>
        <Carousel />
      </WidthLayout>
    </>
  );
}
