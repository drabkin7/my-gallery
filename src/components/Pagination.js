import React from 'react';
import './pagination.css';



function Pagination({ resultsPerPage, totalResults, paginate }) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalResults / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ margin: 'auto' }}>
      <ul className='pagination' style={{ display: 'flex' }}>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}


export default Pagination;
