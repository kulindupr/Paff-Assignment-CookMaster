"use client"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "../../styles/Pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []

    // Always show first page
    pageNumbers.push(1)

    // Calculate range around current page
    let rangeStart = Math.max(2, currentPage - 1)
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Adjust range if at the beginning or end
    if (currentPage <= 3) {
      rangeEnd = Math.min(4, totalPages - 1)
    } else if (currentPage >= totalPages - 2) {
      rangeStart = Math.max(2, totalPages - 3)
    }

    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pageNumbers.push("...")
    }

    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i)
    }

    // Add ellipsis after range if needed
    if (rangeEnd < totalPages - 1) {
      pageNumbers.push("...")
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  return (
    <div className="pagination">
      <button
        className="pagination-button prev"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>

      <div className="pagination-pages">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              className={`pagination-page ${page === currentPage ? "active" : ""}`}
              onClick={() => handlePageClick(page)}
              disabled={page === currentPage}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        className="pagination-button next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  )
}

export default Pagination

