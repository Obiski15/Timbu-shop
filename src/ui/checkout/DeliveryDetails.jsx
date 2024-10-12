import styled from "styled-components";

import HorizontalLine from "../components/HorizontalLine";

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;

  @media only screen and (max-width: 1201px) {
    display: none;
  }
`;

const MainHeader = styled.div`
  width: 100%;
  line-height: 3rem;
  font-weight: 600;
  font-size: 2.4rem;
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3.5rex;
  margin-top: 1px solid #e2e1e1;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  line-height: 3rem;
  font-size: 1.6rem;
`;

const TitleTxt = styled.div``;

const Edit = styled.div`
  color: var(--secondary-color);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const Des = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 30px;
  color: #6d6d6d;
`;

function DeliveryDetails() {
  return (
    <Details>
      <MainHeader>Delivery Details</MainHeader>
      <HorizontalLine gap={1} />

      <MainWrapper>
        <Wrapper>
          <Title>
            <TitleTxt>Customer Address</TitleTxt>
            <Edit>Edit</Edit>
          </Title>

          <Content>
            <Header>Lagos State</Header>
            <Des>25, micheal, Ayorinde street</Des>
          </Content>
        </Wrapper>

        <HorizontalLine />
        <Wrapper>
          <Title>
            <TitleTxt>Delivery Mode</TitleTxt>
            <Edit>Edit</Edit>
          </Title>

          <Content>
            <Header>Door Delivery</Header>
            <Des>Delivery Between 11, july and 12, july</Des>
          </Content>
        </Wrapper>
        <HorizontalLine />
      </MainWrapper>
    </Details>
  );
}

export default DeliveryDetails;
