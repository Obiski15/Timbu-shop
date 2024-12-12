import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/components/Button";

const EmptyOrderWrapper = styled.div`
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
  padding: 4rem 0;
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

const Text = styled.p`
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
      letter-spacing: 0.1rem;
    }
  }
`;

function EmptyOrder() {
  const navigate = useNavigate();

  return (
    <EmptyOrderWrapper>
      <Empty>
        <EmptyCartImage>
          <img src="/images/trolley.svg" alt="empty-order" />
        </EmptyCartImage>

        <Text>
          <p>You have placed no orders yet!</p>
          <p>
            All your orders will be saved here for you to access their state
            anytime.
          </p>
        </Text>
        <Button onClick={() => navigate("/")}>Continue Shopping</Button>
      </Empty>
    </EmptyOrderWrapper>
  );
}

export default EmptyOrder;
