import styled from "styled-components";

import Skeleton from "../../components/Skeleton";

const StyledDummyItem = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  min-width: 120px;

  & > div {
    &:first-child {
      height: 102px;
      border-radius: 8px;
    }

    &:nth-child(2) {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.6rem;

      & > div {
        border-radius: 4px;
        width: 100%;
        height: 2rem;
      }
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

function DummyItem() {
  return (
    <StyledDummyItem>
      <Skeleton></Skeleton>

      <div>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
      </div>
    </StyledDummyItem>
  );
}

export default DummyItem;
