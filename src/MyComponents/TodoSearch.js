import React from 'react';

const TodoSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control form-control-sm"
      style={{ width: "250px", display: "inline-block", marginRight: "10px" }}
    />
  );
};

export default TodoSearch;
