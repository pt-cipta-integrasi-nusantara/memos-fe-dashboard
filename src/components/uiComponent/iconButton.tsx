import React from "react";
import { cn } from "../../utils/classnamesHelper";

export interface IconButton extends React.ComponentProps<"button"> {}
const IconButton = ({ children, className, ...props }: IconButton) => {
  return (
    <button
      {...props}
      className={cn(
        "hover:bg-[#0000000a] active:bg-[#00000021] w-8 h-8 rounded-[50%] flex justify-center items-center",
        {
          "opacity-50 cursor-not-allowed hover:bg-transparent active:bg-transparent":
            props.disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
