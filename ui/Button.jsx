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

function Button({ children, full, type, onClick }) {
  return (
    <StyledButton full={full} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  full: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
