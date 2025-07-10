import React from "react";
import WordCard from "../cards/WordCard";
import SingleWords1 from "../svgs/SingleWords1";
import SingleWords2 from "../svgs/SingleWords2";
import SingleWords3 from "../svgs/SingleWords3";

export default function SingleWordExamplesSection() {
  return (
    <section className="w-full flex flex-col items-center px-4 py-section-y border-b-line-width border-brand-line bg-brand-background">
      <div className="w-full max-w-[1080px] mx-auto flex flex-col gap-between-cards items-center">
        {/* Heading */}
        <div className="flex flex-col gap-between-heading items-start w-full">
          <h3 className="text-h4 text-brand-text font-semibold">Start with these short phrases</h3>
        </div>
        {/* Word Cards */}
        <div className="flex flex-col gap-between-cards w-full">
        <WordCard className="overflow-hidden">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
            <SingleWords1 className="w-full h-auto" />
        </div>
        </WordCard>
        <WordCard className="overflow-hidden">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
            <SingleWords2 className="w-full h-auto" />
        </div>
        </WordCard>
        <WordCard className="overflow-hidden">
        <div className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto">
            <SingleWords3 className="w-full h-auto" />
        </div>
        </WordCard>
        </div>
      </div>
    </section>
  );
} 