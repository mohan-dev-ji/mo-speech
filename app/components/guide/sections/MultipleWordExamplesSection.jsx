import React from "react";
import WordCard from "../cards/WordCard";
import MultipleWords1 from "../svgs/MultipleWords1";
import MultipleWords2 from "../svgs/MultipleWords2";
import MultipleWords3 from "../svgs/MultipleWords3";
import MultipleWords5 from "../svgs/MultipleWords5";

export default function MultipleWordExamplesSection() {
  return (
    <section className="w-full flex flex-col items-center px-4 py-section-y border-b-line-width border-brand-line bg-brand-background">
      <div className="w-full max-w-[1080px] mx-auto flex flex-col gap-between-cards items-center">
        {/* Heading */}
        <div className="flex flex-col gap-between-heading items-start w-full">
          <h3 className="text-h4 text-brand-text font-semibold">Try these multiple word phrases</h3>
        </div>
        {/* Word Cards */}
        <div className="flex flex-col gap-between-cards w-full">
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <MultipleWords1 className="w-full h-auto" />
            </div>
          </WordCard>
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <MultipleWords2 className="w-full h-auto" />
            </div>
          </WordCard>
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <MultipleWords3 className="w-full h-auto" />
            </div>
          </WordCard>
          <WordCard className="overflow-hidden">
            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
              <MultipleWords5 className="w-full h-auto" />
            </div>
          </WordCard>
        </div>
      </div>
    </section>
  );
} 