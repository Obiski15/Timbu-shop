import styled from "styled-components";
import PropTypes from "prop-types";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = styled.div`
  min-height: 100svh;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  justify-content: center;
  align-items: start;
  grid-gap: 1rem;

  @media only screen and (min-width: 768px) {
    padding: 0 2rem;
  }
`;

function DescriptionLayout({ children }) {
  return (
    <Layout>
      <Header>Description</Header>
      <Main>{children}</Main>

      <Footer />
    </Layout>
  );
}

DescriptionLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DescriptionLayout;
