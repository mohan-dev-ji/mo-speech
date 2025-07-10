"use client";

import React from "react";
import Navbar from "../../components/shared/ui/Navbar";
import Footer from "../../components/shared/ui/Footer";
import ContactHeadingSection from "../../components/contact/sections/ContactHeadingSection";
import ContactFormSection from "../../components/contact/sections/ContactFormSection";
import SocialMediaSection from "../../components/contact/sections/SocialMediaSection";
import FinalCtaSection from "../../components/landing/sections/FinalCtaSection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full pt-24">
        <ContactHeadingSection />
        <ContactFormSection />
        <SocialMediaSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
} 