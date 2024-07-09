import styled from "styled-components";
import Button from "./Button";
import { formatCurrency } from "../src/utils/helpers";
import HorizontalLine from "./HorizontalLine";
import { useNavigate } from "react-router-dom";

const Summary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Header = styled.p`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 600;
  text-transform: capitalize;
  border-bottom: 1px solid #e2e1e1;
  padding: 0 20px 0 20px;

  & hr {
    display: none;
  }

  @media only screen and (min-width: 1201px) {
    border: none;

    & hr {
      margin-top: 0.1rem;
      display: block;
      background-color: #e2e1e1;
      height: 1px;
      width: 100%;
    }
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.8rem;
  padding: 10px 20px 10px 20px;
`;

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3.4rem;
`;

const PricesOutline = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.2rem;
  width: 100%;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Fee = styled.p`
  font-weight: 500;
  font-size: 2.4rem;
`;

const Des = styled.p`
  font-weight: 400;
  font-size: 1.5rem;
`;

const Total = styled.p`
  color: var(--secondary-color);
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: 0.005rem;
`;

const SummaryHeader = styled.span`
  font-weight: 600;
  line-height: 3rem;
  font-size: 2.4rem;
`;

function OrderSummary() {
  const navigate = useNavigate();
  return (
    <Summary>
      <Header>
        <SummaryHeader>Order Summary</SummaryHeader>
        <HorizontalLine />
      </Header>

      <hr />

      <Body>
        <Main>
          <PricesOutline>
            <Row>
              <Des>
                Item <span>(1)</span>
              </Des>
              <Fee>{formatCurrency(121.52)}</Fee>
            </Row>

            <Row>
              <Des>Delivery fee </Des>
              <Fee>{formatCurrency(2.22)}</Fee>
            </Row>

            <Row>
              <Des>Discount</Des>
              <Fee>{formatCurrency(1)}</Fee>
            </Row>
          </PricesOutline>

          <hr />

          <Row>
            <Des>Total</Des>
            <Total>{formatCurrency(124.74)}</Total>
          </Row>
        </Main>

        <Button full={true} onClick={() => navigate("/checkout")}>
          checkout
        </Button>
      </Body>
    </Summary>
  );
}

export default OrderSummary;
