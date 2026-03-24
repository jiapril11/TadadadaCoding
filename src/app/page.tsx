import dynamic from "next/dynamic";
import Hero from './components/Home/Hero';
import StackSection from './components/Home/StackSection';
import StatementSection from './components/Home/StatementSection';
// import TwinCarousel from "./components/Home/TwinCarousel";

export default async function Home() {
  return (
    <>
        <Hero />
        <StackSection />
        <StatementSection />
    </>
  );
}
