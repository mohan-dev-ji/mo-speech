import React from "react";
import Card2 from "../cards/Card2";
import ShieldAlertIcon from "../svgs/ShieldAlertIcon";
import ShieldCheckIcon from "../svgs/ShieldCheckIcon";

export default function ChallengesSection() {
  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 py-section-y">
      {/* Bottom border for section */}
      <div className="w-full max-w-[1044px] mx-auto flex flex-col items-start">
        {/* Heading and subheading */}
        <div className="flex flex-col items-start gap-between-heading text-left w-full">
          <h2 className="text-h2-mobile md:text-h2 text-brand-text text-left">
            How Mo Speech{" "}
            <span className="bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">
              Makes It Easier
            </span>
          </h2>
          <p className="text-p text-brand-text-secondary max-w-2xl text-left">
            Mo Speech removes the barrier of slow symbol navigation.
          </p>
        </div>
        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-between-cards w-full items-stretch justify-center mt-12">
          {/* Card 1 */}
          <Card2
            icon={null}
            title="The challenges with most AAC tools"
            description={
              <ul className="flex flex-col gap-4 text-left text-brand-text-secondary">
                <li className="flex gap-2 items-start">
                  <ShieldAlertIcon style={{ width: 22, height: 22 }} color="#eba91c" />
                  Users spend too long searching for symbols
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldAlertIcon style={{ width: 22, height: 22 }} color="#eba91c" />
                  Nested categories and static layouts get in the way
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldAlertIcon style={{ width: 22, height: 22 }} color="#eba91c" />
                  Apps often only work on one tablet or OS
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldAlertIcon style={{ width: 22, height: 22 }} color="#eba91c" />
                  Cognitive overload with small imagery
                </li>
              </ul>
            }
            bgColor="bg-brand-card"
            textColor="text-brand-text"
            hoverShadow="hover:shadow-[0_8px_32px_0_rgba(235,169,28,0.25)]"
            titleAlign="left"
          />
          {/* Card 2 */}
          <Card2
            icon={null}
            title="How Mo Speech Helps"
            description={
              <ul className="flex flex-col gap-4 text-left text-brand-text-secondary">
                <li className="flex gap-2 items-start">
                  <ShieldCheckIcon style={{ width: 22, height: 22 }} color="#00b5cd" />
                  Find symbols instantly with natural language input
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldCheckIcon style={{ width: 22, height: 22 }} color="#00b5cd" />
                  No deep menus or distractions, just speak and go
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldCheckIcon style={{ width: 22, height: 22 }} color="#00b5cd" />
                  Works in Chrome on any laptop, tablet, or phone
                </li>
                <li className="flex gap-2 items-start">
                  <ShieldCheckIcon style={{ width: 22, height: 22 }} color="#00b5cd" />
                  Built to reduce overload
                </li>
              </ul>
            }
            bgColor="bg-brand-card"
            textColor="text-brand-text"
            hoverShadow="hover:shadow-[0_8px_32px_0_rgba(0,181,205,0.25)]"
            titleAlign="left"
          />
        </div>
      </div>
    </section>
  );
} 