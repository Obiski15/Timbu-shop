import styled from "styled-components";
import Skeleton from "../../../ui/components/Skeleton";

const StyledDummyItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 2rem;

  @media only screen and (min-width: 992px) {
    padding-left: 0;
    margin-top: 1rem;
  }
`;

const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
`;

function DummyCartItem() {
  return (
    <StyledDummyItem>
      <DetailsWrapper>
        <Skeleton width={108} height={102} />
        <Details>
          <Skeleton width={150} height={15} />
          <Skeleton width={100} height={15} />
          <Skeleton width={50} height={15} />
        </Details>
      </DetailsWrapper>

      <Summary>
        <Skeleton width={40} height={10} />
        <Skeleton width={30} height={10} />
        <Skeleton width={50} height={10} />
      </Summary>
    </StyledDummyItem>
  );
}

export default DummyCartItem;
