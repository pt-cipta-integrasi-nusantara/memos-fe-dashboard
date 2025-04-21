import React from "react";
import { cn } from "../../../utils/classnamesHelper";

export type TColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "purple";
interface ChipProps extends React.ComponentProps<"div"> {
  value: string;
  color?: TColor;
}

const chipBackgroundColors: Record<TColor, string> = {
  error: "bg-[#FFE5ED]",
  primary: "bg-blue-100",
  success: "bg-[#EBF9EF]",
  warning: "bg-[#FFF7E5]",
  info: "bg-[#E9F1FC]",
  purple: "bg-[#EEECF8]",
};
const chipTextColors: Record<TColor, string> = {
  error: "text-[#E40044]",
  primary: "text-blue-500",
  success: "text-[#21783B]",
  info: "text-[#134786]",
  warning: "text-[#996B00]",
  purple: "text-[#352970]",
};

const Chip = ({ value, color = "primary", className, ...props }: ChipProps) => {
  return (
    <div className="flex">
      <div
        {...props}
        className={cn(
          "py-1 px-2 rounded-[99px] flex items-center justify-center",
          chipBackgroundColors[color],
          className
        )}
      >
        <span
          className={cn(
            "text-xs font-semibold",
            chipTextColors[color],
            className
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};

export default Chip;
