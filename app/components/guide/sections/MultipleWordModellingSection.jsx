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
    title: "Prepare Your Sentence",
    description: "Think of the words you want to want to focus and the sentence they will be used in."
  },
  {
    number: 3,
    title: "Find the Words",
    description: "Search for the word by typing and adding symbols one by one or use the voice recognition search to add a collection of words."
  },
  {
    number: 4,
    title: "Speak naturally",
    description: "Communicate your sentence in a normal manner."
  },
  {
    number: 5,
    title: "Model",
    description: "While speaking play the words so they go to fullscreen and point as they relate to what you are saying."
  },
  {
    number: 6,
    title: "No Expectation",
    description: "Don't ask or expect a response. Keep it natural and be on the look out for more opportunities."
  }
];

export default function MultipleWordModellingSection() {
  const { openSignIn} = useClerk();
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
          <h2 className="text-h3 bg-gradient-to-r from-gradient-from to-gradient-to bg-clip-text text-transparent">Multiple Word Modelling</h2>
          <p className="text-p text-brand-text-secondary max-w-md">
            Pick more than one word in a sentence that you want to teach the meaning of. <span className="text-brand-text-secondary">You don&apos;t need to model every word. Focus on the important ones:</span>
          </p>
          <div className="mt-4">
            <Button variant="secondary" size="nav" onClick={handleSignIn}>
              Sign In
            </Button>
          </div>
        </div>
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-between-cards w-full">
          {cards.slice(0, 3).map(card => (
            <Card1
              key={card.number}
              icon={<div className="bg-[rgba(0,116,205,0.16)] rounded-full flex items-center justify-center w-[55px] h-[55px] text-[36px] font-semibold text-brand-primary">{card.number}</div>}
              title={card.title}
              description={card.description}
              hoverShadow="hover:shadow-[0_8px_32px_0_rgba(0,116,205,0.16)]"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-between-cards w-full">
          {cards.slice(3, 6).map(card => (
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