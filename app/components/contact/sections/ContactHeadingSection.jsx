import React from "react";

export default function GuideHeadingSection() {
  return (
    <section className="w-full flex flex-col items-center px-4 py-section-y border-b-line-width border-brand-line bg-brand-background">
      <div className="w-full max-w-[1080px] mx-auto flex flex-col gap-12 items-center">
        {/* Heading */}
        <div className="flex flex-col gap-2 items-start w-full">
          <h1 className="text-h2-mobile md:text-h2 font-manrope font-semibold leading-[1.1] text-left w-full">
            <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">We Value Your Feedback</span>
          </h1>
          <p className="text-large leading-7 text-brand-text-secondary max-w-2xl mt-2">
          Help us improve Mo Speech by sharing your experiences, suggestions, or by reporting any issues you&apos;ve encountered.
          </p>
        </div>
      </div>
    </section>
  );
} 