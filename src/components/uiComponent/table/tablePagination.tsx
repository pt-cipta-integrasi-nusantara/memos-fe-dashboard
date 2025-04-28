import { cn } from "../../../utils/classnamesHelper";
import { ChevronLeftIcon, ChevronRightIcon } from "../../iconsComponent";
import IconButton from "../iconButton";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalData: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
}

const TablePagination = ({
  currentPage,
  totalPages = 1,
  totalData,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = (pageNumber: number | string) => {
    if (pageNumber !== "..." && pageNumber !== currentPage) {
      onPageChange(pageNumber as number);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 6) {
        for (let i = 1; i <= 7; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 5) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        for (let i = totalPages - 6; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = 1; i <= 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        for (let i = totalPages - 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers.map((number, index) => (
      <span
        key={index}
        className={cn(
          "text-[12px] font-semibold  cursor-pointer  border-b border-transparent py-2 px-4  rounded-lg",
          {
            "bg-[#FEE7E7] text-primary-500": number === currentPage,
          }
        )}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </span>
    ));
  };

  return (
    <div className="flex w-full justify-between py-3 relative items-center">
      <span className="text-[#31475E] text-[14px]">{`Showing ${pageSize} of ${totalData} results`}</span>
      <div className="w-1/2 flex items-center justify-end gap-1 border-gray-200 relative">
        <IconButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-10 w-10 p-3"
        >
          <ChevronLeftIcon />
        </IconButton>
        {renderPageNumbers()}
        <IconButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-10 w-10 p-3"
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TablePagination;
