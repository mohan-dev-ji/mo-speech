import React from "react";

export function H1({ children, className = "", ...props }) {
    return (
      <h1
        className={`scroll-m-20 text-5xl font-extrabold md:text-7xl tracking-tight leading-[1.1] md:leading-[1.21] ${className}`}
        {...props}
      >
        {children}
      </h1>
    );
  }

export function H2({ children, className = "", ...props }) {
  return (
    <h2
      className={`scroll-m-20 text-3xl font-bold sm:text-4xl md:text-5xl tracking-tight leading-[1.21] ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}