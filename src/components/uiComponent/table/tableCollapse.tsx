import React from "react";
import { cn } from "../../../utils/classnamesHelper";

interface TableCollapseProps {
  expand: boolean;
  className?: string;
  children: React.ReactNode;
}

const TableCollapse = ({ expand, children, className }: TableCollapseProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out transform overflow-hidden",
        {
          "max-h-screen opacity-100": expand,
          "max-h-0 opacity-0": !expand,
        },
        className
      )}
    >
      {expand ? children : null}
    </div>
  );
};

export default TableCollapse;
