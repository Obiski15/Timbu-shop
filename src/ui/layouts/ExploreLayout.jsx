import styled from "styled-components";
import PropTypes from "prop-types";

import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StyledExploreLayout = styled.div`
  min-height: 100svh;
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

function ExploreLayout({ children }) {
  return (
    <StyledExploreLayout>
      <Header>Explore</Header>
      <Main>{children}</Main>
      <BottomNav />
      <Footer />
    </StyledExploreLayout>
  );
}

ExploreLayout.propTypes = {
  children: PropTypes.node,
};

export default ExploreLayout;
