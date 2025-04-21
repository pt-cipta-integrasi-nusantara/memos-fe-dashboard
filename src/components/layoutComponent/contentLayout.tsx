import React from "react";
import { cn } from "../../utils/classnamesHelper";

interface ContentLayoutProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title: string;
  actions?: React.ReactNode;
  onBack?: () => void;
}
const ContentLayout = ({
  title,
  actions,
  className,
  children,
  onBack,
  ...props
}: ContentLayoutProps) => {
  return (
    <div {...props} className={cn(" bg-white px-5 pb-16", className)}>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-x-3">
          {onBack && <span>b</span>}
          {title && <h1 className="text-2xl font-bold">{title}</h1>}
        </div>
        {actions}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default ContentLayout;
