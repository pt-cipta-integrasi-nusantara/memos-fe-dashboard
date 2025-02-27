import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({
  children,
  className,
  ...rest
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "shadow-md w-full p-8 rounded-lg border border-neutral-250",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
