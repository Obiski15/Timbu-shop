import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const StyledDummyOrderItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: auto;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
`;

const Main = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

function DummyOrderItem() {
  return (
    <StyledDummyOrderItem>
      <Skeleton height={100} />
      <Main>
        <Skeleton width={200} />
        <Skeleton width={100} height={10} />
        <Skeleton width={50} height={10} />
      </Main>
    </StyledDummyOrderItem>
  );
}

export default DummyOrderItem;
