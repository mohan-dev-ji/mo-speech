import React from "react";

export default function Card3({ icon, title, description }) {
  return (
    <div className="flex-1 max-w-xl rounded-3xl flex flex-col items-center justify-center px-10 py-8 shadow-lg backdrop-blur-md">
      <div className="rounded-full flex items-center justify-center w-[80px] h-[80px] mb-6">
        {icon}
      </div>
      <h3 className="text-h3 text-brand-text leading-[49px] tracking-[-0.216px] mb-3 text-center">{title}</h3>
      <p className="text-large text-brand-text-secondary text-center">{description}</p>
    </div>
  );
} 