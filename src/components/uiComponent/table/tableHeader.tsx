import { cn } from "../../../utils/classnamesHelper";
import { TTableColumn } from "./table";

interface TableHeaderProps<TData> {
  columns: Array<TTableColumn<TData>>;
  useCollapse?: boolean;
}
const TableHeader = <TData,>({
  columns,
  useCollapse,
}: TableHeaderProps<TData>) => {
  return (
    <thead>
      <tr className="bg-[#F3F5F7] border-b">
        {useCollapse && <th className="w-4" />}
        {columns.map((column) => {
          const { id, label, className, align = "left", ...props } = column;
          return (
            <th
              key={`table-header-${id.toString()}`}
              {...props}
              align={align}
              className={cn("py-4 px-2 font-semibold text-[14px]", className)}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHeader;
