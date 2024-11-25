import styled from "styled-components";
import PropTypes from "prop-types";

import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4rem;
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
`;

function CartLayout({ children }) {
  return (
    <Layout>
      <Header>Cart</Header>
      <Main>{children}</Main>
      <Footer />
      <BottomNav />
    </Layout>
  );
}

CartLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartLayout;
