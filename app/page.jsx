"use client";

import Navbar from "./components/shared/ui/Navbar";
import HeroSection from "./components/landing/sections/HeroSection";
import WhatIsMoSpeechSection from "./components/landing/sections/WhatIsMoSpeechSection";
import ChallengesSection from "./components/landing/sections/ChallengesSection";
import FeatureVoiceSection from "./components/landing/sections/FeatureVoiceSection";
import FeatureTextSection from "./components/landing/sections/FeatureTextSection";
import FeatureFullscreenSection from "./components/landing/sections/FeatureFullscreenSection";
import WhoIsItForSection from "./components/landing/sections/WhoIsItForSection";
import ThreeStepsSection from "./components/landing/sections/ThreeStepsSection";
import FinalCtaSection from "./components/landing/sections/FinalCtaSection";
import Footer from "./components/shared/ui/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-brand-background">
      <Navbar />
      <main className="flex-1 pt-24 max-w-1080">
        <HeroSection />
        <WhatIsMoSpeechSection />
        <ChallengesSection />
        <FeatureVoiceSection />
        <FeatureTextSection />
        <FeatureFullscreenSection />
        <WhoIsItForSection />
        <ThreeStepsSection />
        <FinalCtaSection />
        <Footer />
      </main>
    </div>
  );
} 