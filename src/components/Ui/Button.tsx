import React, { ButtonHTMLAttributes, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonParams {
  title: string;
  onClick?: () => void;
  isPrimary?: boolean;
  className?: string;
  isClinix?: boolean;
  isDisabled?: boolean;
  icon?: ReactElement;
}

type ButtonProps = ButtonParams & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  title,
  isPrimary,
  className,
  onClick,
  isClinix = false,
  isDisabled = false,
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={twMerge(
        "rounded-lg px-4 py-2 border-2 min-h-12 flex items-center justify-center",
        isDisabled
          ? "bg-neutral-100 text-neutral-500 border-neutral-100"
          : isPrimary
          ? isClinix
            ? "bg-green-500 border-green-500 text-white"
            : "bg-primary-500 border-primary-500 text-white"
          : isClinix
          ? "bg-white border-green-500 text-green-500"
          : "bg-white border-primary-500 text-primary-500",
        className
      )}
      {...rest}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {title}
    </button>
  );
}
