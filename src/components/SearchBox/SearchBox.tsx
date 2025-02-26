import React from "react";
import { twMerge } from "tailwind-merge";
import { SearchIcon } from "../Icons";

interface SearchBoxProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBox({
  onSearch,
  placeholder = "Cari...",
  className,
}: SearchBoxProps) {
  return (
    <div
      className={twMerge(
        "rounded-full border border-neutral-100 py-[10px] px-[12px] flex items-center gap-2 bg-white",
        className
      )}
    >
      <SearchIcon />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full focus:outline-none"
        onChange={onSearch}
      />
    </div>
  );
}
