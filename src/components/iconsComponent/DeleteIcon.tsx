export function DeleteIcon({ ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M10.6666 6V12.6667H5.33325V6H10.6666ZM9.66659 2H6.33325L5.66659 2.66667H3.33325V4H12.6666V2.66667H10.3333L9.66659 2ZM11.9999 4.66667H3.99992V12.6667C3.99992 13.4 4.59992 14 5.33325 14H10.6666C11.3999 14 11.9999 13.4 11.9999 12.6667V4.66667Z"
        fill={props?.color ?? "#CC003D"}
      />
    </svg>
  );
}
