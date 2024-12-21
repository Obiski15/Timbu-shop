import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  text-align: center;
  text-transform: capitalize;
  color: #f8f8f8;
  border-radius: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1rem;
  padding: 16px 20px;

  &:not(:disabled):hover {
    opacity: 0.8;
  }

  ${(props) => {
    switch (props.variant) {
      case "destructive":
        return css`
          background-color: var(--destructive);
        `;
      case "secondary":
        return css`
          background-color: white;
          color: var(--secondary-color);
          border: 1px solid var(--secondary-color);
        `;
      case "success":
        return css`
          background-color: var(--success);
          color: white;
        `;
      default:
        return css`
          background-color: var(--secondary-color);

          &:disabled {
            background-color: #f8f8f8;
            color: var(--secondary-color);
          }
        `;
    }
  }};

  ${(props) =>
    props.type === "small" &&
    css`
      padding: 11.87px 14.84px;
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

function Button({ children, full, type, onClick, disabled, variant }) {
  return (
    <StyledButton
      full={full}
      type={type}
      disabled={disabled}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  full: PropTypes.bool,
};

export default Button;
