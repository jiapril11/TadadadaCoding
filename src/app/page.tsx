import MainBanner from "./components/Home/MainBanner";
import Cards from "./components/Posts/Cards";
import WidthLayout from "./components/WidthLayout";

export default async function Home() {
  return (
    <>
      <MainBanner />
      <WidthLayout>
        <h2>Posts</h2>
        <Cards />
      </WidthLayout>
    </>
  );
}
