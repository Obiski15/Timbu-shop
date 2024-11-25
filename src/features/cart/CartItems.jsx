import styled from "styled-components";

import { useCart } from "../../services/cart/useCart";

import DummyCartItem from "../../ui/layouts/dummy/DummyCartItem";
import CartItem from "./CartItem";
import { memo } from "react";

const Items = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  line-height: 2.6rem;
`;

const CartItems = memo(function CartItems() {
  const { cart, isLoading } = useCart();

  return (
    <Items>
      {isLoading
        ? Array.from({ length: 2 }, (_, i) => <DummyCartItem key={i + 1} />)
        : cart?.data?.cart?.items?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
    </Items>
  );
});

export default CartItems;
