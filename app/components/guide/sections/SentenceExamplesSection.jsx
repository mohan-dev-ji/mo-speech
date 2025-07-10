import React from "react";
import WordCard from "../cards/WordCard";
import FullSentenceWords1 from "../svgs/FullSentenceWords1";
import FullSentenceWords2 from "../svgs/FullSentenceWords2";
import FullSentenceWords3 from "../svgs/FullSentenceWords3";
import FullSentenceWords4 from "../svgs/FullSentenceWords4";

export default function SentenceExamplesSection() {
  return (
    <section className="w-full flex flex-col items-center px-4 py-section-y border-b-line-width border-brand-line bg-brand-background">
      <div className="w-full max-w-[1080px] mx-auto flex flex-col gap-between-cards items-center">
        {/* Heading */}
        <div className="flex flex-col gap-between-heading items-start w-full">
          <h3 className="text-h4 text-brand-text font-semibold">Try these full sentence examples</h3>
        </div>
        {/* Word Cards */}
        <div className="flex flex-col gap-between-cards w-full">
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <FullSentenceWords1 className="w-full h-auto" />
            </div>
          </WordCard>
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <FullSentenceWords2 className="w-full h-auto" />
            </div>
          </WordCard>
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <FullSentenceWords3 className="w-full h-auto" />
            </div>
          </WordCard>
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <FullSentenceWords4 className="w-full h-auto" />
            </div>
          </WordCard>
        </div>
      </div>
    </section>
  );
} 