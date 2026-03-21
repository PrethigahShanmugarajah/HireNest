// Client / src / pages / client / Home / Components / Pagination.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../../../components/Button";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage = 6,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-10">
      <a href="#job-list">
        <ChevronLeft
          className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        />
      </a>

      {Array.from({ length: totalPages }).map((_, index) => (
        <a key={index} href="#job-list">
          <Button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-10 h-10 px-0! py-0! flex items-center justify-center hover:bg-purple-200 ${
              currentPage === index + 1
                ? "bg-purple-300! text-purple-700"
                : "text-gray-500"
            }`}
            variant={"text"}
          >
            {index + 1}
          </Button>
        </a>
      ))}

      <a href="#job-list">
        <ChevronRight
          className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        />
      </a>
    </div>
  );
};

export default Pagination;
