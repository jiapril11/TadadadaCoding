import React from "react";
import WidthLayout from "../components/WidthLayout";
import Profile from "../components/Contact/Profile";
import ContactForm from "../components/Contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Contact",
  description: "About & Contact",
  openGraph: {
    title: "About & Contact",
    description: "About & Contact",
  },
};

export default function ContactPage() {
  return (
    <WidthLayout>
      <Profile />
      <ContactForm />
    </WidthLayout>
  );
}
