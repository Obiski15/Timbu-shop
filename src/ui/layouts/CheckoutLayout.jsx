import styled from "styled-components";
import PropTypes from "prop-types";

import BottomNav from "../components/BottomNav";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4rem;
`;

const Main = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
`;

function CheckoutLayout({ children }) {
  return (
    <Layout>
      <Header>Checkout</Header>
      <Main>{children}</Main>
      <Footer />
      <BottomNav />
    </Layout>
  );
}

CheckoutLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckoutLayout;
