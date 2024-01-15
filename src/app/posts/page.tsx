import React from "react";
import WidthLayout from "../components/WidthLayout";
import Cards from "../components/Posts/Cards";
import { Kreon } from "next/font/google";

const kreon = Kreon({ subsets: ["latin"] });

export default async function PostsPage() {
  return (
    <WidthLayout>
      <h2 className={`${kreon.className} mt-6 mb-5 font-semibold text-2xl`}>
        Posts
      </h2>
      <Cards />
    </WidthLayout>
  );
}
