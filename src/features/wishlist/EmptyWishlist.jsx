import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/components/Button";

const EmptyWishlistWrapper = styled.div`
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

const EmptyWishlistImage = styled.div`
  width: 100px;
  height: 100px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const EmptyWishlistTextWrapper = styled.div`
  max-width: 300px;
  width: 100%;
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

function EmptyWishlist() {
  const navigate = useNavigate();

  return (
    <EmptyWishlistWrapper>
      <Empty>
        <EmptyWishlistImage>
          <img src="/images/wishlist.svg" alt="empty-wishlist" />
        </EmptyWishlistImage>

        <EmptyWishlistTextWrapper>
          <p>You haven&apos;t saved any item</p>
          <p>
            Found something you like? Tap on the heart shaped icon next to the
            item to add it to your wishlist! All your saved items will appear
            here.
          </p>
        </EmptyWishlistTextWrapper>
        <Button onClick={() => navigate("/")}>Continue Shopping</Button>
      </Empty>
    </EmptyWishlistWrapper>
  );
}

export default EmptyWishlist;
