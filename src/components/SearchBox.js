import React from 'react';

function SearchBox({ handleSearch }) {
  return (
    <div style={{padding: '10px 40px 5px 5px'}}>
      <input type="search" onChange={handleSearch} />
    </div>
  )
}

export default SearchBox;
