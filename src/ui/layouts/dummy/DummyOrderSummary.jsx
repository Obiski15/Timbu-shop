import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const CommonStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const Main = styled(CommonStyle)`
  gap: 3.4rem;
`;

const PricesOutline = styled(CommonStyle)`
  gap: 1.2rem;
`;

function DummyOrderSummary() {
  return (
    <>
      <Main>
        <PricesOutline>
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
        </PricesOutline>

        <Skeleton height={20} />
      </Main>

      <Skeleton height={20} />
    </>
  );
}

export default DummyOrderSummary;
