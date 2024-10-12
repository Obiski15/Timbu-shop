import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.div`
  min-height: 100svh;
  min-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0 0 0;
  border: 2px solid gold;
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

function DescriptionLayout({ children, navHeight }) {
  return <Layout navHeight={navHeight}>{children}</Layout>;
}

DescriptionLayout.propTypes = {
  children: PropTypes.node.isRequired,
  navHeight: PropTypes.number,
};

export default DescriptionLayout;
