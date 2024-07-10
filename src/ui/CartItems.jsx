import styled from "styled-components";
import { cart as items } from "../data/data";

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

function CartItems() {
  return (
    <Items>
      {items.map((item, i) => (
        <CartItem key={i + 1} item={item} />
      ))}
    </Items>
  );
}

export default CartItems;
