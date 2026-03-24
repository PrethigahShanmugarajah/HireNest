// Client / src / components / Pagination.jsx
import { useMemo } from "react";
import Button from "./Button";
import { MoreHorizontal } from "lucide-react";
import { SelectInput } from "./FormField/SelectInput";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 10,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 15, 25],
  color = "purple",
  className = "",
  showItemsPerPage = true,
}) => {
  const perPageOptions = useMemo(
    () =>
      itemsPerPageOptions.map((count) => ({
        label: `${count} per page`,
        value: count,
      })),
    [itemsPerPageOptions],
  );

  if (totalPages <= 1 && !showItemsPerPage) return null;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className={`mt-6 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="text"
            size="s"
          >
            Prev
          </Button>

          {getPages().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-2 text-gray-500">
                <MoreHorizontal color="#000000" />
              </span>
            ) : (
              <Button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                size="s"
                variant={currentPage === page ? "primary" : "text"}
                color={color}
                className={`min-w-9 ${
                  currentPage === page
                    ? ""
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {page}
              </Button>
            ),
          )}

          <Button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="text"
            size="s"
          >
            Next
          </Button>
        </div>

        {showItemsPerPage && (
          <div className="min-w-37.5">
            <SelectInput
              options={perPageOptions}
              value={itemsPerPage}
              onChange={(nextValue) =>
                onItemsPerPageChange?.(Number(nextValue))
              }
              size="m"
              placeholder="Items per page"
              isClearable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
