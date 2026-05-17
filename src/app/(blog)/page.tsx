import dynamic from "next/dynamic";
import Hero from "@/app/components/Home/Hero";
import StackSection from "@/app/components/Home/StackSection";
import StatementSection from "@/app/components/Home/StatementSection";
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
