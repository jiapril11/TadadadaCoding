import React from "react";
import WidthLayout from "../components/WidthLayout";
import Profile from "../components/About/Profile";
import ContactForm from "../components/About/ContactForm";

export default function AboutPage() {
  return (
    <WidthLayout>
      <Profile />
      <ContactForm />
    </WidthLayout>
  );
}
