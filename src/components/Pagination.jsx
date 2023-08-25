import React from 'react';
import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function Pagination({ currentPage, setCurrentPage, totalResults }) {
  const VISIBLE_PAGES = 5;
  const RESULTS_PER_PAGE = 12;
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  let displayStart = 0;
  let displayEnd = 0;

  if (currentPage && totalResults) {
    displayStart = (currentPage - 1) * RESULTS_PER_PAGE + 1;
    displayEnd = Math.min(currentPage * RESULTS_PER_PAGE, totalResults);
  }


  const getVisiblePages = () => {
    let start = Math.max(1, currentPage - Math.floor(VISIBLE_PAGES / 2));
    let end = Math.min(totalPages, start + VISIBLE_PAGES - 1);

    if (end - start + 1 < VISIBLE_PAGES) {
      start = Math.max(1, end - VISIBLE_PAGES + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-12">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageClick(currentPage - 1);
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageClick(currentPage + 1);
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
            <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{displayStart}</span> to <span className="font-medium">{displayEnd}</span> of{' '}
                <span className="font-medium">{totalResults ?? 0}</span> results
            </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) handlePageClick(currentPage - 1);
              }}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            
            {getVisiblePages().map(pageNum => (
              <a
                  key={pageNum}
                  onClick={(e) => {
                      e.preventDefault();
                      handlePageClick(pageNum);
                  }}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNum ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'} focus:z-20 focus:outline-offset-0`}
              >
                  {pageNum}
              </a>
            ))}
            
            <a
              onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) handlePageClick(currentPage + 1);
              }}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalResults: PropTypes.number.isRequired
};
