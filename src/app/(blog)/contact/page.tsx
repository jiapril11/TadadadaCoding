import React from "react";
import WidthLayout from "@/app/components/WidthLayout";
import Profile from "@/app/components/Contact/Profile";
import ContactForm from "@/app/components/Contact/ContactForm";
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
