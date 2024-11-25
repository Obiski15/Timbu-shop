import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/components/Button";

const EmptyCartWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Empty = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const EmptyCartImage = styled.div`
  width: 100px;
  height: 100px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const EmptyCartTextWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  & > p {
    &:first-child {
      font-weight: 600;
      word-spacing: 0.1rem;
    }

    &:last-child {
      font-weight: 400;
      font-size: 1.2rem;
      letter-spacing: 0.1rem;
    }
  }
`;

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <EmptyCartWrapper>
      <Empty>
        <EmptyCartImage>
          <img src="/images/empty-cart.svg" alt="empty-cart" />
        </EmptyCartImage>

        <EmptyCartTextWrapper>
          <p>Your cart is Empty!</p>
          <p>Browse our categories and discover best deals!</p>
        </EmptyCartTextWrapper>
        <Button onClick={() => navigate("/")}>Start Shopping</Button>
      </Empty>
    </EmptyCartWrapper>
  );
}

export default EmptyCart;
