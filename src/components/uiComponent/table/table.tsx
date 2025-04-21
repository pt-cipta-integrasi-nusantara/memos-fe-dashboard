import React, { useState } from "react";
import TableHeader from "./tableHeader";
import TableCollapse from "./tableCollapse";
import { cn } from "../../../utils/classnamesHelper";
import TablePagination, { PaginationProps } from "./tablePagination";
import IconButton from "../iconButton";
import { ArrowDownIcon } from "../../iconsComponent";

export interface TTableColumn<TData> {
  id: keyof TData;
  label: React.ReactNode;
  setContent: (data: TData, index?: number) => React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "justify";
  width?: string;
}
interface TableProp<TData> extends React.ComponentProps<"table"> {
  isLoading: boolean;
  data: Array<TData>;
  columns: Array<TTableColumn<TData>>;
  onListClick?: (data: TData) => void;
  tableRowProps?: React.ComponentProps<"tr">;
  tableRowClasses?: (data: TData) => string;
  pagination?: PaginationProps;
  collapseContent?: React.ReactNode;
}

const Table = <TData,>({
  isLoading,
  data,
  columns,
  onListClick,
  tableRowClasses,
  pagination,
  className,
  tableRowProps,
  collapseContent,
  ...props
}: TableProp<TData>) => {
  const [expandedRows, setExpandedRows] = useState<{
    index: number;
    isOpen: boolean;
  }>({
    index: 0,
    isOpen: false,
  });
  return (
    <div>
      <table
        {...props}
        className={cn("w-full table border-collapse", className)}
      >
        <TableHeader columns={columns} useCollapse={!!collapseContent} />
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="min-h-[15rem] flex w-full justify-center items-center flex-col gap-y-2">
                  Loading
                </div>
              </td>
            </tr>
          ) : data?.length > 0 ? (
            data?.map((dt, index) => (
              <React.Fragment key={`table-body-${index}`}>
                <tr
                  {...tableRowProps}
                  className={cn("border-b", tableRowProps?.className, {
                    "cursor-pointer": onListClick,
                    [tableRowClasses?.(dt) as string]: tableRowClasses,
                  })}
                >
                  {collapseContent && (
                    <td className="py-4 px-2 text-[14px]">
                      <IconButton
                        className={cn(
                          "transition-transform",
                          expandedRows.index === index && expandedRows.isOpen
                            ? "rotate-180"
                            : "rotate-0"
                        )}
                        onClick={() =>
                          setExpandedRows((prev) => ({
                            index: index,
                            isOpen: index === prev.index ? !prev.isOpen : true,
                          }))
                        }
                      >
                        <ArrowDownIcon />
                      </IconButton>
                    </td>
                  )}
                  {columns.map((column) => {
                    const { id, className, setContent, ...props } = column;
                    return (
                      <td
                        key={`table-row-${id.toString()}`}
                        {...props}
                        onClick={() => onListClick?.(dt)}
                        className={cn("py-4 px-2 text-[14px]", className)}
                      >
                        {setContent(dt, index)}
                      </td>
                    );
                  })}
                </tr>

                {collapseContent && (
                  <tr>
                    <th
                      colSpan={columns.length + 1}
                      className={cn({
                        "p-4 bg-[#F3F5F7]":
                          expandedRows.index === index && expandedRows.isOpen,
                      })}
                    >
                      <TableCollapse
                        expand={
                          expandedRows.index === index && expandedRows.isOpen
                        }
                      >
                        {collapseContent}
                      </TableCollapse>
                    </th>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>
                <div className="min-h-[15rem] flex w-full justify-center items-center flex-col gap-y-2">
                  <span className="text-base font-semibold text-default">
                    Belum Ada Data
                  </span>
                  <span className="text-[14px] text-subdued">Data Kosong</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {pagination && <TablePagination {...pagination} />}
    </div>
  );
};

export default Table;
