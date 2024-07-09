import PropTypes from "prop-types";
import styled from "styled-components";

const Layout = styled.div`
  min-height: 100svh;
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
`;

function CartLayout({ children }) {
  return <Layout>{children}</Layout>;
}

CartLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartLayout;
