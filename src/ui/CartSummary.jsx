import { useSelector } from "react-redux";
import styled from "styled-components";

import { getTotalCartPrice } from "../features/cart/cartSlice";

const Summary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  line-height: 2.6rem;
  gap: 2.4rem;
`;

const Header = styled.p`
  width: 100%;
  padding: 10px 20px 10px 20px;
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: 1px solid #e2e1e1;
`;

const Subtotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 20px 0px 20px;
  align-items: flex-start;
`;

const SubtotalHeader = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.005rem;
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.005rem;
`;

function CartSummary() {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <Summary>
      <Header>Cart Summary</Header>
      <Subtotal>
        <SubtotalHeader>Subtotal</SubtotalHeader>
        <Price>{getTotalCartPrice(cart)}</Price>
      </Subtotal>
    </Summary>
  );
}

export default CartSummary;
