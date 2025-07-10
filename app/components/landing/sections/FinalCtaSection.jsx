"use client";

import React from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "../../shared/ui/button";

export default function FinalCtaSection() {
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const handleAction = () => {
    if (isSignedIn) {
      router.push("/app");
    }
    // If not signed in, the handleSignIn will handle the sign in flow
  };

  const handleSignIn = () => {
    console.log("Opening sign in from final CTA");
    openSignIn({
      redirectUrl: "/app"
    });
  };

  return (
    <section className="relative w-full bg-brand-background px-section-x-mobile md:px-section-x py-section-y-mobile md:py-section-y border-b-line-width border-brand-line">
      <div className="flex flex-col items-center w-full max-w-[container-width] mx-auto"> 
   
            <div className="flex flex-col gap-4 items-center border-line-width border-brand-line rounded-2xl p-card-x py-card-y">
              <h2 className="text-h3-mobile md:text-h3 text-brand-text gap-between-heading">
              Ready to Try Mo Speech?
              </h2>
              <p className="text-large text-brand-text-secondary max-w-2xl gap-between-icon">
              Use the app in Chrome on any device
              </p>
    
            {isSignedIn ? (
              <Button 
                variant="secondary"
                size="nav"
                onClick={handleAction}
              >
                Use Mo Speech Now
              </Button>
            ) : (
              <Button 
                variant="secondary"
                size="nav"
                onClick={handleSignIn}
              >
                Start free account
              </Button>
            )}
            </div>
      </div>
    </section>
  );
} 