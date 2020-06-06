import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Pagination.scss';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const [page, setPage] = useState();
  const [totalPageNumber, setTotalPageNumber] = useState();

  useEffect(() => {
    setPage(currentPage);
    setTotalPageNumber(totalPages);
  }, [currentPage, totalPages]);

  return (
    <>
      <span className="pageCount">
        {page} - {totalPageNumber}
      </span>
      <button onClick={() => paginate('prev')} className={page > 1 ? 'paginate-button' : 'paginate-button disable'}>
        Prev
      </button>
      <button onClick={() => paginate('next')} className={page === totalPageNumber ? 'paginate-button disable' : 'paginate-button'}>
        Next
      </button>
    </>
  );
};

Pagination.propTypes = {
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Pagination;
