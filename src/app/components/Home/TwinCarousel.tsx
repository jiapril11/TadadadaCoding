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
    title: "Amigo Signal",
    cover: "/imgs/home/amigo-signal.png",
    logo: "/imgs/home/amigo-signal-logo.png",
    url: "https://www.amigo-signal.com",
    github: "https://github.com/congjiwon/amigo_signal",
    pageLink: "/projects/amigo-signal",
    tags: [
      "여행동행찾기",
      "동행신청",
      "여행지리뷰공유",
      "회원가입/로그인",
      "CRUD",
    ],
    skills: [
      "React",
      "Javascript",
      "Typescript",
      "Tanstack Query",
      "Supabase",
      "Zustand",
      "styled-components",
      "antd",
      "github",
      "figma",
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
