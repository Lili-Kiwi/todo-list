import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25em;
`;
const StyledInput = styled.input`
  padding: 0.4em 0.8em;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  font-size: 1rem;
`;

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <StyledLabel htmlFor={elementId}>
      {label}
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </StyledLabel>
  );
}

export default TextInputWithLabel;
