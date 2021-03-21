import React from 'react';

const SearchFilter = (props) => {
    return (
      <input value={props.newSearch} onChange={props.handleSearchChange} />
    );
}

export default SearchFilter;