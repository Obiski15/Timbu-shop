import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import styled from "styled-components";

import { useCart } from "../../services/cart/useCart";

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const Quantity = styled.p`
  font-size: 1rem;
  position: absolute;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  top: 0.1rem;
  right: -0.3rem;
  background-color: var(--secondary-color);

  & > span {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    color: #ffffff;
  }
`;

function CartIcon() {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <IconWrapper onClick={() => navigate("/cart")}>
      <IoCartOutline />

      <Quantity>
        <span>
          {cart?.data?.cart?.items
            .map((item) => item.quantity)
            .reduce((acc, qun) => acc + qun, 0) ?? 0}
        </span>
      </Quantity>
    </IconWrapper>
  );
}

export default CartIcon;
