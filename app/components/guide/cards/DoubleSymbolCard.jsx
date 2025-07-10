import React from "react";
import Image from "next/image";

export default function DoubleSymbolCard({ leftText, symbols = [], rightText }) {
  return (
    <div className="bg-brand-background rounded-2xl border-2 border-brand-line flex flex-col items-center justify-center w-full max-w-[1080px] min-h-[301px] px-10 py-[60px] relative">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
        {leftText && (
          <span className="text-h4 text-brand-text text-left whitespace-nowrap">
            {leftText}
          </span>
        )}
        {symbols.map((symbol, idx) => (
          <div key={idx} className="bg-[#e0e0e0] rounded-[7.5px] flex items-center justify-center w-28 h-28 relative overflow-hidden">
            <Image src={symbol} alt="symbol" width={112} height={112} className="w-full h-full object-contain" />
          </div>
        ))}
        {rightText && (
          <span className="text-h4 text-brand-text text-right whitespace-nowrap">
            {rightText}
          </span>
        )}
      </div>
    </div>
  );
} 