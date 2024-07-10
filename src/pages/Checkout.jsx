import Header from "../ui/Header";
import CheckoutLayout from "../ui/CheckoutLayout";
import Card from "../ui/Card";
import OrderSummary from "../ui/OrderSummary";
import DeliveryDetails from "../ui/DeliveryDetails";
import styled from "styled-components";
import HorizontalLine from "../ui/HorizontalLine";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.2rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (min-width: 1201px) {
    width: 90%;
  }
`;

const Outline = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
`;

const OrderSummaryWrapper = styled.div`
  width: 40%;
  @media only screen and (max-width: 1201px) {
    display: none;
  }
`;

function Checkout() {
  return (
    <CheckoutLayout>
      <Header>payment details</Header>
      <HorizontalLine gap={6.4} />

      <Main>
        <Outline>
          <DeliveryDetails />
          <Card />
        </Outline>
        <OrderSummaryWrapper>
          <OrderSummary />
        </OrderSummaryWrapper>
      </Main>
    </CheckoutLayout>
  );
}

export default Checkout;
