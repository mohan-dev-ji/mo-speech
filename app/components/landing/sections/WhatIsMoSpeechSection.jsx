import React from "react";
import Card1 from "../cards/Card1";
import SearchIcon from "../svgs/SearchIcon";
import ScanEyeIcon from "../svgs/ScanEyeIcon";
import UtensilsIcon from "../svgs/UtensilsIcon";

export default function WhatIsMoSpeechSection() {
  return (
    <section id="about" className="relative w-full bg-brand-background px-section-x-mobile md:px-section-x py-section-y-mobile md:py-section-y">
      <div className="flex flex-col items-center w-full max-w-[container-width] mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-between-heading items-start md:items-center text-left md:text-center w-full">
          <h2 className="text-h2-mobile md:text-h2 text-brand-text">
            What is <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">Mo Speech?</span>
          </h2>
          <p className="text-p text-brand-text-secondary w-full md:w-auto">
            Mo Speech is a free online resource that bridge&apos;s the gap between everyday life and AAC training.
          </p>
        </div>
        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-between-cards w-full max-w-[1044px] mx-auto items-stretch justify-center mt-12">
          <div className="w-full md:flex-1">
            <Card1
              icon={
                <div className="bg-brand-icon-bg-blue flex items-center justify-center p-[10px] rounded-full size-[55px] mb-4">
                  <SearchIcon className="w-[22px] h-[22px]" />
                </div>
              }
              title="Search for Symbols"
              description="Instant access to the SymbolStix collection"
              hoverShadow="hover:shadow-[0_8px_32px_0_rgba(0,181,205,0.25)]"
            />
          </div>
          <div className="w-full md:flex-1">
            <Card1
              icon={
                <div className="bg-brand-icon-bg-green flex items-center justify-center p-[10px] rounded-full size-[55px] mb-4">
                  <ScanEyeIcon className="w-6 h-6" />
                </div>
              }
              title="Language in Action"
              description="AAC users need to see language to learn it"
              hoverShadow="hover:shadow-[0_8px_32px_0_rgba(0,181,205,0.25)]"
            />
          </div>
          <div className="w-full md:flex-1">
            <Card1
              icon={
                <div className="bg-brand-icon-bg-yellow flex items-center justify-center p-[10px] rounded-full size-[55px] mb-4">
                  <UtensilsIcon className="w-6 h-6" />
                </div>
              }
              title="Modelling"
              description="Model language at every opportunity through out the day"
              hoverShadow="hover:shadow-[0_8px_32px_0_rgba(235,169,28,0.25)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 