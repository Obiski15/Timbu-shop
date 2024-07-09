import styled from "styled-components";
import PropTypes from "prop-types";

const Layout = styled.main`
  margin: 20px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 6.4rem;
`;

function CheckoutLayout({ children }) {
  return <Layout>{children}</Layout>;
}

CheckoutLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CheckoutLayout;
