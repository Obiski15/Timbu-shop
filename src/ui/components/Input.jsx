import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3;
  border-radius: 0.5rem;
  padding: 0.5rem 0.6rem;
  transition: all 0.5s;

  border: ${(props) => {
    switch (props.isActive) {
      case true:
        return "1px solid var(--secondary-color)";
      default:
        return "1px solid var(--border)";
    }
  }};

  & > input {
    height: 100%;
    width: 100%;
    letter-spacing: 0.1rem;
  }
`;

const Label = styled.label`
  position: relative;
  text-transform: capitalize;
  font-weight: 500;

  ${(props) =>
    props.required &&
    css`
      &::after {
        content: "*";
        font-weight: 500;
        position: absolute;
        top: -0.1rem;
        right: -0.9rem;
        color: var(--destructive);
      }
    `}
`;

const Error = styled.p`
  font-size: 1.2rem;
  color: var(--destructive);
  font-weight: normal;
  letter-spacing: 0.1rem;
`;

function Input({
  id,
  type,
  name,
  label,
  placeholder,
  register,
  error,
  isActive,
  handleActiveInput,
  defaultValue,
  disabled,
  required,
  autocomplete,
}) {
  return (
    <Wrapper>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <InputWrapper isActive={isActive === name}>
        <input
          defaultValue={defaultValue}
          className="focus:outline-none flex-1"
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onFocus={handleActiveInput}
          {...register}
          disabled={disabled}
          autoComplete={autocomplete}
        />
      </InputWrapper>
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
}

Input.propTypes = {
  handleActiveInput: PropTypes.func,
  autocomplete: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  register: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  isActive: PropTypes.any,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.any,
};

export default Input;
