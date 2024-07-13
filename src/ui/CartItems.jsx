import { useSelector } from "react-redux";
import styled from "styled-components";

import CartItem from "./CartItem";

const Items = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  line-height: 2.6rem;
`;

const EmptyCart = styled.div`
  width: 100%;
  padding: 20px 20px 0 20px;

  @media only screen and (min-width: 1201px) {
    padding: 20px 0 0 0;
  }
`;

function CartItems() {
  const cart = useSelector((state) => state.cart.cart);

  if (!cart.length) return <EmptyCart>Your Cart is Empty! 😀</EmptyCart>;
  return (
    <Items>
      {cart?.map((item, i) => (
        <CartItem key={i + 1} item={item} />
      ))}
    </Items>
  );
}

export default CartItems;
