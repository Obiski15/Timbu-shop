import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useCart } from "../../services/cart/useCart";
import { formatCurrency } from "../../utils/helpers";

import DummyOrderSummary from "../../ui/layouts/dummy/DummyOrderSummary";
import Button from "../../ui/components/Button";

const StyledOrderSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2.8rem;
  padding: 1rem 2rem;
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

const Discount = styled(Fee)`
  text-decoration: line-through;
`;

const Total = styled(Fee)`
  color: var(--secondary-color);
  letter-spacing: 0.005rem;
`;

function OrderSummary() {
  const { cart, isLoading } = useCart();
  const navigate = useNavigate();

  return (
    <StyledOrderSummary>
      {isLoading ? (
        <DummyOrderSummary />
      ) : (
        <>
          <Main>
            <PricesOutline>
              <Row>
                <Des>
                  Item{" "}
                  <span>
                    (
                    {cart?.data?.cart?.items
                      ?.map((item) => item.quantity)
                      .reduce((acc, qun) => acc + qun, 0)}
                    )
                  </span>
                </Des>
                <Fee>{formatCurrency(cart?.data?.cart?.totalPrice)}</Fee>
              </Row>

              <Row>
                <Des>Delivery fee</Des>
                <Fee>{formatCurrency(cart?.data?.cart?.deliveryFee)}</Fee>
              </Row>

              <Row>
                <Des>Discount</Des>
                <Discount>{formatCurrency(0)}</Discount>
              </Row>
            </PricesOutline>

            <Row>
              <Des>Total</Des>
              <Total>{formatCurrency(cart?.data?.cart?.finalPrice)}</Total>
            </Row>
          </Main>

          <Button full={true} onClick={() => navigate("/checkout")}>
            checkout
          </Button>
        </>
      )}
    </StyledOrderSummary>
  );
}

export default OrderSummary;
