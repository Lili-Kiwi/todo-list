import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  padding: 0.5em 0;
`;
const StyledInput = styled.input`
  padding: 0.4em 0.8em;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 0.5em;
`;
const StyledSelect = styled.select`
  padding: 0.4em 0.8em;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  font-size: 1rem;
  margin: 0 0.5em 0 0;
`;
const StyledButton = styled.button`
  padding: 0.5em 1.2em;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
`;

const TodosViewForm = ({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) => {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <StyledForm onSubmit={preventRefresh}>
      <div>
        <label>Search todos:</label>
        <StyledInput
          type="text"
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
        />
        <StyledButton type="button" onClick={() => setQueryString('')}>
          Clear
        </StyledButton>
      </div>
      <div>
        <label>Sort by</label>
        <StyledSelect
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </StyledSelect>
        <label>Direction</label>
        <StyledSelect
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </StyledSelect>
      </div>
    </StyledForm>
  );
};
const preventRefresh = (e) => {
  e.preventDefault();
};

export default TodosViewForm;
