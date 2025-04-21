import React from "react";
import { cn } from "../../../utils/classnamesHelper";

interface RadioProps extends React.ComponentProps<"input"> {
  label?: React.ReactNode;
  labelProps?: React.ComponentProps<"label">;
}

const Radio = ({ label, labelProps, className, ...props }: RadioProps) => {
  return (
    <div className="flex items-center">
      <input
        {...props}
        type="radio"
        className={cn(
          "w-4 h-4 accent-red-500  bg-gray-100 border-gray-300 focus:ring-red-400 mt-[.2em]",
          className
        )}
      />

      <label
        htmlFor={props.id}
        {...labelProps}
        className="ms-2 text-sm font-normal"
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
