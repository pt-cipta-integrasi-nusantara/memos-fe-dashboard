import React from "react";
import { cn } from "../../../utils/classnamesHelper";

interface ToggleProps extends React.ComponentProps<"label"> {
  label?: React.ReactNode;
  labelProps?: React.ComponentProps<"span">;
  inputProps?: React.ComponentProps<"input">;
}

const Toggle = ({
  label,
  labelProps,
  className,
  inputProps,
  ...props
}: ToggleProps) => {
  return (
    <label
      {...props}
      className={cn(
        "inline-flex gap-x-2 items-center cursor-pointer",
        className
      )}
    >
      <input {...inputProps} type="checkbox" className="sr-only peer" />
      <div className="relative w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-primary-500 ring-0" />
      <span
        {...labelProps}
        className={cn("ms-2 text-[14px] font-normal", labelProps?.className)}
      >
        {label}
      </span>
    </label>
  );
};

export default Toggle;
