import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const Layout = styled.div`
  min-height: 100svh;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;

  @media only screen and (max-width: 1201px) {
    ${(props) => css`
      padding-bottom: ${props.navHeight}px;
    `}
  }
`;

function CartLayout({ children, navHeight }) {
  return <Layout navHeight={navHeight}>{children}</Layout>;
}

CartLayout.propTypes = {
  children: PropTypes.node.isRequired,
  navHeight: PropTypes.number,
};

export default CartLayout;
