import React from "react";
import { cn } from "../../../utils/classnamesHelper";

interface TextFieldProps extends React.ComponentProps<"input"> {
  label?: string;
  required?: boolean;
  error?: boolean;
  containerProps?: React.ComponentProps<"div">;
  helperText?: React.ReactNode;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, required, error, containerProps, helperText, ...props }, ref) => {
    return (
      <div
        {...containerProps}
        className={cn(
          "flex flex-col w-full gap-y-1",
          containerProps?.className
        )}
      >
        {label && (
          <label
            htmlFor={props?.id}
            className="block text-[14px] font-medium text-[#31475E]"
          >
            {label}
            {required && <span className="text-primary-500 ml-1">*</span>}
          </label>
        )}

        <input
          {...props}
          ref={ref}
          autoComplete="off"
          className={cn(
            "w-full outline-none border border-primary-300 text-[14px] rounded-lg focus:ring-primary-500 transition-all focus:ring-1 py-2 px-3 shadow-sm",
            props?.className,
            {
              "border-red-500 border-1": error,
            }
          )}
        />
        {helperText && (
          <p
            className={cn("text-sm text-default text-red-500", {
              "text-red-500": error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
