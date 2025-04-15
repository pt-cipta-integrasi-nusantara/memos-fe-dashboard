import React from "react";
import { cn } from "../../../utils/classnamesHelper";

interface CheckboxProps extends React.ComponentProps<"input"> {
  label?: React.ReactNode;
  labelProps?: React.ComponentProps<"label">;
  containerClassName?: string;
}

const Checkbox = ({
  label,
  labelProps,
  className,
  containerClassName,
  ...props
}: CheckboxProps) => {
  return (
    <div className={cn("flex items-start", containerClassName)}>
      <input
        {...props}
        type="checkbox"
        className={cn(
          "w-4 h-4 accent-primary-500 bg-gray-100 border-gray-300 focus:ring-primary mt-[.2em]",
          {
            "cursor-not-allowed": props.disabled,
          },
          className
        )}
      />

      <label
        htmlFor={props.id}
        {...labelProps}
        className={cn("ms-2 text-[14px] font-normal", labelProps?.className)}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
