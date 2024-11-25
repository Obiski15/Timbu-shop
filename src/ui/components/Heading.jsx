import styled, { css } from "styled-components";

export const Heading = styled.h1`
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
          font-weight: 500;
        `;
    }
  }}
`;
