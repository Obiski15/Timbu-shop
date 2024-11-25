import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

const StyledDummyDeliveryDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3.5rex;
  margin-top: 1px solid var(--border);
  padding: 0 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

function DummyDeliveryDetails() {
  return (
    <StyledDummyDeliveryDetails>
      <Wrapper>
        <Skeleton height={40} width={300} />
        <Content>
          <Skeleton height={25} />
          <Skeleton height={25} />
        </Content>
      </Wrapper>

      <Wrapper>
        <Skeleton height={40} width={300} />

        <Content>
          <Skeleton height={25} />
          <Skeleton height={25} />
        </Content>
      </Wrapper>
    </StyledDummyDeliveryDetails>
  );
}

export default DummyDeliveryDetails;
