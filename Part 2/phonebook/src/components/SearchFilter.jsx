import React from 'react';

const SearchFilter = (props) => {
    return (
      <div>
        <p>
          Search by name
          <input value={props.newSearch} onChange={props.handleSearchChange} />
        </p>
      </div>
    );
}

export default SearchFilter;