import React from "react";
import Card1 from "../../landing/cards/Card1";
import { Button } from "../../shared/ui/button";
import { useClerk } from "@clerk/nextjs";


const cards = [
  {
    number: 1,
    title: "Sign into Mo Speech",
    description: "Go to MoSpeech.com and sign up to get access to the entire Symbol Stix collection for free."
  },
  {
    number: 2,
    title: "Say Your Sentence",
    description: "Enable voice recognition and say your sentence to display all the symbols for it."
  },
  {
    number: 3,
    title: "Model the Sentence",
    description: "Speak the sentence while pointing to the symbols as they play on your device."
  },
  {
    number: 4,
    title: "No Expectation",
    description: "Don't ask or expect a response. Keep it natural and be on the look out for more opportunities."
  }
];

export default function SentenceModellingSection() {
  const { openSignIn } = useClerk();
  const handleSignIn = () => {
    console.log("Opening sign in");
    openSignIn({
      redirectUrl: "/app"
    });
  };
  return (
    <section className="w-full flex flex-col items-center px-4 py-section-y bg-brand-background">
      <div className="w-full max-w-[1080px] mx-auto flex flex-col gap-12 items-center">
        {/* Heading and description */}
        <div className="flex flex-col gap-between-heading items-start w-full">
        <h2 className="text-h3 bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">Model Sentences</h2>
          <p className="text-p text-brand-text-secondary max-w-md">
            As your learner becomes familiar with the symbols, you can begin to model full sentences.
          </p>
          <div className="mt-4">
            <Button variant="secondary" size="nav" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-between-cards w-full">
          {cards.map(card => (
            <Card1
              key={card.number}
              icon={<div className="bg-[rgba(0,116,205,0.16)] rounded-full flex items-center justify-center w-[55px] h-[55px] text-[36px] font-semibold text-brand-primary">{card.number}</div>}
              title={card.title}
              description={card.description}
              hoverShadow="hover:shadow-[0_8px_32px_0_rgba(0,116,205,0.16)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
} 