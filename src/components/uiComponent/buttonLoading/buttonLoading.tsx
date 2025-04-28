import React from "react";
import Spinner, { SpinnerProps } from "../spinner/spinner";
import { cn } from "../../../utils/classnamesHelper";

interface ButtonLoadingProps extends React.ComponentProps<"button"> {
  isLoading?: boolean;
  spinnerProps?: SpinnerProps;
}
const ButtonLoading = ({
  isLoading,
  spinnerProps,
  children,
  className,
  disabled,
  ...props
}: ButtonLoadingProps) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        "text-white bg-primary-500 rounded-lg px-4 py-[.7em] flex items-center justify-center gap-x-2",
        {
          "bg-neutral-100 text-neutral-500 border-neutral-100": disabled,
        },
        className
      )}
    >
      {isLoading && <Spinner {...spinnerProps} />}
      {children}
    </button>
  );
};

export default ButtonLoading;
