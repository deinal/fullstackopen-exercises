import React from 'react';

const Filter = ({ filterPersons, handleFilterChange }) => {
    return (
        <div>
            filter shown with <input value={filterPersons} onChange={handleFilterChange} />
        </div>
    )
}

export default Filter;