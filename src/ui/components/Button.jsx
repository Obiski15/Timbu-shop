import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  text-align: center;
  background-color: var(--secondary-color);
  text-transform: capitalize;
  color: #f8f8f8;
  border-radius: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1rem;
  padding: 16px 20px 16px 20px;

  &:hover {
    color: var(--secondary-color);
    background-color: #f8f8f8;
  }

  ${(props) =>
    props.type === "small" &&
    css`
      padding: 11.87px 14.84px 11.87px 14.84px;
      border-radius: 3.8rem;
      line-height: 0.7rem;
      font-size: 1.2rem;
    `}

  ${(props) =>
    props.full &&
    css`
      width: 100%;
    `}
`;

function Button({ children, full, type, onClick, disabled }) {
  return (
    <StyledButton full={full} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  full: PropTypes.bool,
};

export default Button;
