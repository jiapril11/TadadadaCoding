import React from "react";
import WidthLayout from "../components/WidthLayout";
import Profile from "../components/About/Profile";
import ContactForm from "../components/About/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "About & Contact",
  openGraph: {
    title: "About & Contact",
    description: "About & Contact",
  },
};

export default function AboutPage() {
  return (
    <WidthLayout>
      <Profile />
      <ContactForm />
    </WidthLayout>
  );
}
