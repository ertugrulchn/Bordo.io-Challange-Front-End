import React from "react";
import { Pagination } from "react-bootstrap";

function PaginationItem({ itemPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(
      <Pagination.Item key={i} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination>{pageNumbers}</Pagination>;
}

export default PaginationItem;
