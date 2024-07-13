import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { formatCurrency } from "../utils/helpers";

import HorizontalLine from "./HorizontalLine";
import Button from "./Button";
import {
  getTotalCartPrice,
  getTotalItemQuantity,
} from "../features/cart/cartSlice";
import { useSelector } from "react-redux";

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

const DELIVERY_FEE_PER_ITEM = 250;
function OrderSummary() {
  const cart = useSelector((state) => state.cart.cart);
  const deliveryFee = DELIVERY_FEE_PER_ITEM * getTotalItemQuantity(cart);

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
                Item <span>{`(${getTotalItemQuantity(cart)})`}</span>
              </Des>
              <Fee>{formatCurrency(getTotalCartPrice(cart))}</Fee>
            </Row>

            <Row>
              <Des>Delivery fee</Des>
              <Fee>{formatCurrency(deliveryFee)}</Fee>
            </Row>

            <Row>
              <Des>Discount</Des>
              <Fee>{formatCurrency(1)}</Fee>
            </Row>
          </PricesOutline>

          <hr />

          <Row>
            <Des>Total</Des>
            <Total>
              {formatCurrency(getTotalCartPrice(cart) + deliveryFee - 1)}
            </Total>
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
