import React from "react";
import Image from "next/image";

export default function SingleWordCard({ leftText, symbol, rightText }) {
  return (
    <div className="bg-brand-background rounded-2xl border-2 border-brand-line flex flex-col items-center justify-center w-full max-w-[1080px] h-[301px] px-10 py-[60px] relative">
      <div className="flex flex-row gap-4 items-center justify-center w-full">
        {leftText && (
          <span className="text-h4 text-brand-text tracking-tight leading-[28px] text-left whitespace-nowrap">
            {leftText}
          </span>
        )}
        {symbol && (
          <div className="bg-[#e0e0e0] rounded-[7.5px] flex items-center justify-center w-28 h-28 relative overflow-hidden">
            {typeof symbol === 'string' ? (
              <Image src={symbol} alt="symbol" width={112} height={112} className="w-full h-full object-contain" />
            ) : (
              symbol
            )}
          </div>
        )}
        {rightText && (
          <span className="text-[24px] font-bold text-brand-text tracking-tight leading-[28px] text-right whitespace-nowrap">
            {rightText}
          </span>
        )}
      </div>
    </div>
  );
} 