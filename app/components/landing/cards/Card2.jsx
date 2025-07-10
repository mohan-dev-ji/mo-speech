import React from "react";

export default function Card2({ icon, title, description, bgColor, textColor, hoverShadow, titleAlign = "center" }) {
  return (
    <div
      className={`w-full max-w-2xl min-w-0 ${bgColor} rounded-2xl relative flex flex-col border border-brand-line transition-transform duration-200 hover:-translate-y-2 ${hoverShadow}`}
    >
      <div className="absolute border border-[rgba(224,224,224,0.01)] inset-0 pointer-events-none rounded-2xl" />
      <div className={`flex flex-col gap-8 px-8 py-10 w-full h-full justify-center`}>
        {icon && <div className="flex justify-center w-full">{icon}</div>}
        <div className={`flex flex-col gap-4 w-full ${titleAlign === "left" ? "items-start text-left" : "items-center text-center"}`}>
          <h4 className={`text-h4 font-bold ${textColor}`}>{title}</h4>
          {typeof description === "string" ? (
            <p className="text-p-ui text-brand-text-secondary">{description}</p>
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
} 