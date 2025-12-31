"use client";

import { useState } from "react";
import MainCarousel from "./MainCarousel";
import SubCarousel from "./SubCarousel";
import { HiOutlinePlusSm } from "react-icons/hi";
import CarouselBtns from "./CarouselBtns";
import Link from "next/link";
import Heading2 from "./Heading2";

export type ProjectTypeCarousel = {
  title: string;
  cover: string;
  logo: string;
  url: string;
  github: string;
  pageLink: string;
  tags: string[];
  skills: string[];
};

const projects = [
  {
    title: "Movie List",
    cover: "/imgs/projects/movie_js/movie_js03.png",
    logo: "/imgs/home/next-blog-logo.png",
    url: "https://movie-list-olive.vercel.app/",
    github: "https://github.com/jiapril11/movieList",
    pageLink: "/projects/movie-js",
    tags: [
      "영화API",
      "VanilaJS",
      "UI/반응형",
    ],
    skills: [
      "HTML",
      "CSS",
      "JAVASCRIPT",
      "Swiper",
      "github",
    ],
  },
  {
    title: "Tadadada Coding Blog",
    cover: "/imgs/home/next-blog.png",
    logo: "/imgs/home/next-blog-logo.png",
    url: "https://www.tadadadacoding.com",
    github: "https://github.com/jiapril11/TadadadaCoding",
    pageLink: "/projects/next-blog",
    tags: ["기술 블로그", "프로젝트", "마크다운"],
    skills: [
      "Next.js",
      "Javascript",
      "Typescript",
      "react-markdown",
      "zod",
      "nodemailer",
      "Zustand",
      "Tailwindcss",
      "antd",
      "github",
      "figma",
    ],
  },
];

export const ITEM_HEIGHT = 520;

export default function TwinCarousel() {
  const [activeIndexMain, setActiveIndexMain] = useState(projects.length - 1);
  const [activeIndexSub, setActiveIndexSub] = useState(0);

  const updateIndexMain = (newIndex: number) => {
    if (newIndex <= 0) {
      newIndex = projects.length - 1;
    } else if (newIndex >= projects.length - 1) {
      newIndex = 0;
    }

    setActiveIndexMain(newIndex);
  };
  const updateIndexSub = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > projects.length - 1) {
      newIndex = projects.length - 1;
    }

    setActiveIndexSub(newIndex);
  };
  return (
    <div className="relative mt-10 mb-20">
      <Heading2 title="Projects" link="/projects" />
      <SubCarousel projects={projects} activeIndex={activeIndexSub} />
      <MainCarousel projects={projects} activeIndex={activeIndexMain} />
      <CarouselBtns
        activeIndexMain={activeIndexMain}
        activeIndexSub={activeIndexSub}
        updateIndexMain={updateIndexMain}
        updateIndexSub={updateIndexSub}
        projectsLength={projects.length}
      />
    </div>
  );
}
