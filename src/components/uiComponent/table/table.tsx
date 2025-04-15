import React, { useState } from "react";
import TableHeader from "./tableHeader";
import TableCollapse from "./tableCollapse";
import { cn } from "../../../utils/classnamesHelper";
import TablePagination, { PaginationProps } from "./tablePagination";

export interface TTableColumn<TData> {
  id: keyof TData;
  label: React.ReactNode;
  setContent: (data: TData, index?: number) => React.ReactNode;
  className?: string;
  align?: "left" | "center" | "right" | "justify";
  width?: string;
}
interface TableProp<TData, TCollapse> extends React.ComponentProps<"table"> {
  isLoading: boolean;
  data: Array<TData>;
  columns: Array<TTableColumn<TData>>;
  onListClick?: (data: TData) => void;
  tableRowProps?: React.ComponentProps<"tr">;
  tableRowClasses?: (data: TData) => string;
  pagination?: PaginationProps;
  collapseColumns?: {
    key?: keyof TData;
    data?: Array<TCollapse>;
    columns: Array<TTableColumn<TCollapse>>;
    isLoading?: boolean;
    colSpan: number;
  };
}

const Table = <TData, TCollapse>({
  isLoading,
  data,
  columns,
  onListClick,
  tableRowClasses,
  pagination,
  className,
  tableRowProps,
  collapseColumns,
  ...props
}: TableProp<TData, TCollapse>) => {
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
        <TableHeader columns={columns} useCollapse={!!collapseColumns} />
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
              <React.Fragment key={index}>
                <tr
                  {...tableRowProps}
                  className={cn("border-b", tableRowProps?.className, {
                    "cursor-pointer": onListClick,
                    [tableRowClasses?.(dt) as string]: tableRowClasses,
                  })}
                >
                  {collapseColumns && (
                    <td className="py-4 px-2 text-[14px]">
                      {/* Icon */}
                      {/* <IconButton
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
                      <ArrowDownIcon color="#677A8E" />
                    </IconButton> */}
                    </td>
                  )}
                  {columns.map((column) => {
                    const { id, className, setContent, ...props } = column;
                    return (
                      <td
                        key={id.toString()}
                        {...props}
                        onClick={() => onListClick?.(dt)}
                        className={cn("py-4 px-2 text-[14px]", className)}
                      >
                        {setContent(dt, index)}
                      </td>
                    );
                  })}
                </tr>

                {collapseColumns && (
                  <tr>
                    <th
                      colSpan={collapseColumns.colSpan}
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
                        <table className="w-full table border-collapse bg-white">
                          <TableHeader columns={collapseColumns.columns} />
                          <tbody>
                            {collapseColumns.isLoading ? (
                              <tr>
                                <td colSpan={columns.length}>Loading ...</td>
                              </tr>
                            ) : (
                              (collapseColumns?.key
                                ? (dt[collapseColumns.key] as [])
                                : collapseColumns.data
                              )?.map((collapseItem, index) => (
                                <tr className="border-b">
                                  {collapseColumns.columns.map((column) => {
                                    const {
                                      id,
                                      className,
                                      align = "left",
                                      setContent,
                                      ...props
                                    } = column;
                                    return (
                                      <td
                                        key={id.toString()}
                                        {...props}
                                        className={cn(
                                          "py-4 px-2 text-[14px] font-normal",
                                          className
                                        )}
                                        align={align}
                                      >
                                        {setContent(collapseItem, index)}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
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
