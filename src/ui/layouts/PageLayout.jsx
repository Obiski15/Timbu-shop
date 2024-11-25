import styled from "styled-components";
import PropTypes from "prop-types";

import MainHeader from "../components/MainHeader";
import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";

const Layout = styled.main`
  margin: 0 auto 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
`;

function PageLayout({ children }) {
  return (
    <Layout>
      <MainHeader />
      <Main>{children}</Main>
      <Footer />
      <BottomNav />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
