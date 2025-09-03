import React from 'react';

const TodosViewForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) => {
  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label>Sort by</label>
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        <label>Direction</label>
        <select
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
};
const preventRefresh = (e) => {
  e.preventDefault();
};
export default TodosViewForm;
