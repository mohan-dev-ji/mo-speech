import React from "react";
import Card1 from "../cards/Card1";
import HomeIcon from "../svgs/HomeIcon";
import UsersIcon from "../svgs/UsersIcon";
import EducatorsIcon from "../svgs/EducatorsIcon";

export default function WhoIsItForSection() {
  return (
    <section className="relative w-full bg-brand-background px-section-x-mobile md:px-section-x py-section-y-mobile md:py-section-y">
       <div className="flex flex-col items-center w-full max-w-[container-width] mx-auto">
        {/* Heading */}
        <div className="flex flex-col gap-between-heading items-start md:items-center text-left md:text-center w-full">
          <h2 className="text-h2-mobile md:text-h2 bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">Who is it for?</h2>
        </div>
        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-between-cards w-full max-w-[1044px] mx-auto items-stretch justify-center mt-12">
          <div className="w-full md:flex-1">
          <Card1
            icon={<div className="bg-[rgba(0,116,205,0.16)] rounded-full p-[10px] w-[55px] h-[55px] flex items-center justify-center"><HomeIcon className="w-6 h-6" /></div>}
            title="Parents & Caregivers"
            description="Bringing up or caring for someone with difficulties communicating"
            hoverShadow="hover:shadow-[0_8px_32px_0_rgba(0,116,205,0.16)]"
          />
          </div>
          <div className="w-full md:flex-1">
          <Card1
            icon={<div className="bg-[rgba(0,181,205,0.24)] rounded-full p-[10px] w-[55px] h-[55px] flex items-center justify-center"><UsersIcon className="w-6 h-6" /></div>}
            title="Therapists"
            description="Working with AAC users in clinical settings"
            hoverShadow="hover:shadow-[0_8px_32px_0_rgba(0,181,205,0.24)]"
          />
          </div>
          <div className="w-full md:flex-1">
          <Card1
            icon={<div className="bg-[rgba(235,169,28,0.2)] rounded-full p-[10px] w-[55px] h-[55px] flex items-center justify-center"><EducatorsIcon className="w-6 h-6" /></div>}
            title="Educators"
            description="Teachers and assistants in schools environments"
            hoverShadow="hover:shadow-[0_8px_32px_0_rgba(235,169,28,0.20)]"
          />
          </div>
        </div>
      </div>
    </section>
  );
} 