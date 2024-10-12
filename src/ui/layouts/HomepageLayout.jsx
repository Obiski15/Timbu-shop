import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.main`
  margin: 20px auto 0px auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;
  align-items: flex-start;

  @media only screen and (max-width: 1201px) {
    ${(props) => css`
      padding-bottom: ${props.navHeight}px;
    `}
  }
`;

function HomepageLayout({ children, navHeight }) {
  return <Layout navHeight={navHeight}>{children}</Layout>;
}

HomepageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  navHeight: PropTypes.number,
};

export default HomepageLayout;
