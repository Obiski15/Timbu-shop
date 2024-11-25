import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const CommonStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const CardWrapper = styled(CommonStyle)`
  width: 100%;
  gap: 3rem;
`;

const CardNumber = styled(CommonStyle)`
  width: 100%;
  gap: 3rem;
  padding: 1rem 2rem;
`;

const DateCvvWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
`;

const DateWrapper = styled(CommonStyle)`
  flex: 1;
  gap: 3rem;
`;

const CvvWrapper = styled(CommonStyle)`
  flex: 1;
  gap: 3rem;
`;

function DummyCard() {
  return (
    <CardWrapper>
      <CardNumber>
        <Skeleton width={150} height={20} />
        <Skeleton width={200} height={20} />
      </CardNumber>

      <DateCvvWrapper>
        <DateWrapper>
          <Skeleton width={150} height={20} />
          <Skeleton width={200} height={20} />
        </DateWrapper>

        <CvvWrapper>
          <Skeleton width={150} height={20} />
          <Skeleton width={200} height={20} />
        </CvvWrapper>
      </DateCvvWrapper>
    </CardWrapper>
  );
}

export default DummyCard;
