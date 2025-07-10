import React from "react";

export default function WordCard({ children }) {
  return (
    <div className="bg-brand-card relative rounded-2xl w-full border-2 border-brand-line flex flex-col items-center justify-center px-card-x py-section-y">
      <div className="absolute border-2 border-brand-line border-solid inset-0 pointer-events-none rounded-2xl" />
      <div className="flex flex-col items-center justify-center relative w-full">
        {children}
      </div>
    </div>
  );
} 