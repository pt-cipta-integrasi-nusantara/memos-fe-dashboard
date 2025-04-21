import { ReactNode } from "react";
import ReactSelect, {
  GetOptionLabel,
  GetOptionValue,
  GroupBase,
  Props as ReactSelectProps,
} from "react-select";
import { cn } from "../../../utils/classnamesHelper";

interface SelectProps<T>
  extends Omit<
    ReactSelectProps<T, false, GroupBase<T>>,
    "onChange" | "options" | "getOptionLabel"
  > {
  label?: string;
  options: readonly T[];
  getOptionLabel?: (option: T) => string;
  required?: boolean;
  selectClassName?: string;
  error?: boolean;
  helperText?: ReactNode;
  className?: string;
  onChange?: (value: T) => void;
}
const Select = <T,>(props: SelectProps<T>) => {
  const {
    label,
    error,
    className,
    selectClassName,
    options,
    required,
    getOptionLabel,
    helperText,
    onChange,
    ...reactSelectProps
  } = props;

  const handleOnChange = (value: unknown) => onChange?.(value as T);

  const handleGetOptionLabel = (value: unknown) =>
    getOptionLabel?.(value as T) ?? "";

  return (
    <div className={cn("flex gap-y-1 flex-col", className)}>
      <div className="flex gap-x-[2px]">
        <label
          className={cn("text-[14px] text-default font-medium", {
            "text-error": error,
          })}
        >
          {label}
        </label>
        {required && <span className="text-red-500 text-[14px]">*</span>}
      </div>

      <ReactSelect
        {...reactSelectProps}
        className={cn("text-[14px] shadow-sm ", selectClassName)}
        options={options}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: 8,
            borderColor: error ? "#e40044" : "#ACB8C3",
            ...(state.isFocused && {
              boxShadow: error ? "0 0 0 1px #e40044" : "0 0 0 1px #f75252 ",
            }),
          }),
          option: (base, state) => ({
            ...base,
            ...(state.isSelected && {
              background: "#f75252",
            }),
          }),
        }}
        onChange={handleOnChange}
        getOptionLabel={handleGetOptionLabel as GetOptionLabel<T>}
        getOptionValue={handleGetOptionLabel as GetOptionValue<T>}
      />

      {helperText && (
        <p
          className={cn("text-[14px] text-default", {
            "text-error": error,
          })}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Select;
