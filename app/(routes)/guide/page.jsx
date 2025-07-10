"use client";

import React from 'react';
import Navbar from '../../components/shared/ui/Navbar';
import Footer from '../../components/shared/ui/Footer';
import HeadingSection from '../../components/guide/sections/HeadingSection';
import FinalCtaSection from '@/app/components/landing/sections/FinalCtaSection';
import SingleWordModellingSection from '@/app/components/guide/sections/SingleWordModellingSection';
import SingleWordExamplesSection from '@/app/components/guide/sections/SingleWordExamplesSection';
import MultipleWordModellingSection from '@/app/components/guide/sections/MultipleWordModellingSection';
import MultipleWordExamplesSection from '@/app/components/guide/sections/MultipleWordExamplesSection';
import SentenceModellingSection from '@/app/components/guide/sections/SentenceModellingSection';
import SentenceExamplesSection from '@/app/components/guide/sections/SentenceExamplesSection';


export default function GuidePage() {
  return (
    <div className="min-h-screen bg-brand-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center w-full pt-24">
        <HeadingSection />
        <SingleWordModellingSection />
        <SingleWordExamplesSection />
        <MultipleWordModellingSection />
        <MultipleWordExamplesSection />
        <SentenceModellingSection />
        <SentenceExamplesSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
} 