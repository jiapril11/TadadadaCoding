import React from "react";
import {
  BiLogoReact,
  BiLogoJavascript,
  BiLogoTypescript,
  BiSolidError,
  BiCoffeeTogo,
} from "react-icons/bi";
import { TbBrandNextjs } from "react-icons/tb";
import { FaCss3Alt, FaHtml5, FaGithub } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";

const postIcons: Record<string, React.ReactElement> = {
  react: React.createElement(BiLogoReact, {}),
  next: React.createElement(TbBrandNextjs, {}),
  typescript: React.createElement(BiLogoTypescript, {}),
  javascript: React.createElement(BiLogoJavascript, {}),
  css: React.createElement(FaCss3Alt, {}),
  html: React.createElement(FaHtml5, {}),
  git: React.createElement(FaGithub, {}),
  system: React.createElement(GrSystem, {}),
  error: React.createElement(BiSolidError, {}),
  etc: React.createElement(BiCoffeeTogo, {}),
};

export default postIcons;
