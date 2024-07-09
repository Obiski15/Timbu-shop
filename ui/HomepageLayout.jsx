import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.main`
  margin: 20px auto 0px auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: flex-start;
  align-items: flex-start;
`;

function HomepageLayout({ children }) {
  return <Layout>{children}</Layout>;
}

HomepageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomepageLayout;
