import React from "react";
import Lottie from "lottie-react";
import uiLottie from "../../shared/ui/uiLottie.json";

export default function ThreeStepsSection() {
  return (
    <section id="about" className="relative w-full bg-brand-background px-section-x-mobile md:px-section-x py-section-y-mobile md:py-section-y">
      <div className="flex flex-col md:flex-row items-center w-full max-w-[1044px] mx-auto gap-between-cards">
        {/* Heading */}
        <div className="flex flex-col gap-between-heading items-start text-left">
          <h2 className="text-h2-mobile md:text-h2 bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">Easy to Use</h2>
          <ul className="flex-1 w-full flex-col gap-4 text-large text-brand-text-secondary list-disc pl-6">
            <li>Search for symbols by typing or using your voice</li>
            <li>Quickly find core words from the Symbol Stix library</li>
            <li>Tap a symbol to play audio and model communication</li>
            <li>Use fullscreen mode for distraction-free modelling</li>
            <li>Save your favorites for easy access</li>
            <li>Works instantly in Chrome—no install required</li>
          </ul>
        </div>
        {/* Right: Lottie animation */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="rounded-2xl shadow-lg border-2 border-brand-line overflow-hidden w-full">
            <Lottie
              animationData={uiLottie}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
} 