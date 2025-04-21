import React from "react";
import { cn } from "../../../utils/classnamesHelper";

// TODO: add helperText
interface TextFieldProp extends React.ComponentProps<"input"> {
  label?: string;
  required?: boolean;
  error?: boolean;
  containerProps?: React.ComponentProps<"div">;
  ref?: React.Ref<HTMLInputElement>;
  helperText?: React.ReactNode;
}
const TextField = ({
  label,
  required,
  error,
  ref,
  containerProps,
  helperText,
  ...props
}: TextFieldProp) => {
  return (
    <div
      {...containerProps}
      className={cn("flex flex-col w-full gap-y-1", containerProps?.className)}
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
        id={props.id}
        className={cn(
          "w-full outline-none border border-primary-300 text-[14px] rounded-lg focus:ring-primary-500 transition-all focus:ring-1 py-2 px-3 shadow-sm",
          props?.className,
          {
            "border-primary-500 border-2": error,
          }
        )}
      />
    </div>
  );
};

export default TextField;
