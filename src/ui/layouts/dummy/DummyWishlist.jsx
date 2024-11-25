import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const StyledDummyWishlist = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const WishlistItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
`;

const DetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 2rem;
  gap: 0.5rem;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  width: 100%;
`;

function DummyWishlist() {
  return (
    <StyledDummyWishlist>
      {Array.from({ length: 3 }, (_, i) => (
        <WishlistItem key={i + 1}>
          <DetailsWrapper>
            <Skeleton width={100} height={100} />

            <Details>
              <Skeleton width={200} />
              <Skeleton width={100} />
            </Details>
          </DetailsWrapper>
          <Buttons>
            <Skeleton width={100} />
            <Skeleton width={100} />
          </Buttons>
        </WishlistItem>
      ))}
    </StyledDummyWishlist>
  );
}

export default DummyWishlist;
