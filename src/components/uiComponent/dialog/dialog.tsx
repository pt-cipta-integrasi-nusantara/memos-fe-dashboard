import React from "react";
import { cn } from "../../../utils/classnamesHelper";
import { CloseIcon } from "../../iconsComponent";
import { Button } from "../button";
import IconButton from "../iconButton";

type TActionProps = {
  cancelButtonProps: {
    label?: string;
    className?: string;
  };
  submitButtonProps: {
    label?: string;
    isLoading?: boolean;
    onClick?: () => void;
    className?: string;
  };
};
interface DialogProps extends React.ComponentProps<"div"> {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  customAction?: React.ReactNode;
  showIcon?: boolean;
  useBorder?: boolean;
  actionProps?: Partial<TActionProps>;
  showActions?: boolean;
  contentProps?: React.ComponentProps<"div">;
}

const Dialog = (props: DialogProps) => {
  const {
    open,
    title,
    onClose,
    children,
    showIcon = true,
    useBorder = true,
    className,
    actionProps,
    customAction,
    showActions = true,
    contentProps,
  } = props;
  React.useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0B1A28] bg-opacity-75">
      <div
        className={cn(
          "bg-white w-full max-w-lg rounded-[1em] shadow-lg relative flex flex-col ",
          className
        )}
      >
        {title && (
          <div
            className={cn("flex items-center justify-between px-6 py-4", {
              "border-b border-surface-default": useBorder,
            })}
          >
            <h2 className="text-xl font-bold">{title}</h2>
            {showIcon && (
              <IconButton onClick={onClose} className="mr-[-.6em]">
                <CloseIcon />
              </IconButton>
            )}
          </div>
        )}
        <div
          {...contentProps}
          className={cn(
            "max-h-[70vh] overflow-y-auto px-6",
            contentProps?.className
          )}
        >
          {children}
        </div>
        {showActions && (
          <div
            className={cn("flex flex-col gap-y-3 px-6  py-4", {
              "border-t border-surface-default": useBorder,
            })}
          >
            {customAction ? (
              customAction
            ) : (
              <div className="flex items-center gap-x-4">
                <Button
                  title={actionProps?.cancelButtonProps?.label ?? "Batal"}
                  className={actionProps?.cancelButtonProps?.className}
                  onClick={onClose}
                />
                <Button
                  title={actionProps?.submitButtonProps?.label ?? "Simpan"}
                  className={cn(
                    "text-white bg-primary-500",
                    actionProps?.submitButtonProps?.className
                  )}
                  onClick={actionProps?.submitButtonProps?.onClick}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
