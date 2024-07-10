import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const StyledHeading = styled.h1`
  ${(props) => {
    switch (props.as) {
      case "h2":
        return css`
          font-weight: 700;
        `;
      case "h3":
        return css`
          font-weight: 700;
        `;
      case "h4":
        return css`
          font-weight: 500;
        `;
      case "h5":
        return css`
          font-weight: 500;
        `;
      case "h6":
        return css`
          font-weight: 700;
        `;
      default:
        return css`
          font-weight: 700;
        `;
    }
  }}
`;

function Heading({ children }) {
  return <StyledHeading>{children}</StyledHeading>;
}

Heading.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Heading;
