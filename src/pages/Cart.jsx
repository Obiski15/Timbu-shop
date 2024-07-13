import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";

import { getTotalCartPrice } from "../features/cart/cartSlice";
import { formatCurrency } from "../utils/helpers";
import { useItems } from "../services/useItems";

import HorizontalLine from "../ui/HorizontalLine";
import OrderSummary from "../ui/OrderSummary";
import Recommended from "../ui/Recommended";
import CartSummary from "../ui/CartSummary";
import SavedItems from "../ui/SavedItems";
import CartLayout from "../ui/CartLayout";
import CartItems from "../ui/CartItems";
import ButtomNav from "../ui/BottomNav";
import Button from "../ui/Button";
import Header from "../ui/Header";

const Desktop = styled.div`
  width: 100%;

  @media only screen and (max-width: 1201px) {
    display: none;
  }
`;

const Mobile = styled.div`
  width: 100%;

  @media only screen and (min-width: 1201px) {
    display: none;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${(props) => `${props.gap}rem`};
`;

const CartText = styled.p`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 3rem;
`;

const CartSummaryText = styled.p`
  text-transform: capitalize;
  padding: 0 0 0 20px;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 3rem;
`;

const Subtotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
  align-items: flex-start;
`;

const SubtotalHeader = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.005rem;
`;

const Price = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.005rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0px 20px 0px 20px;
`;

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const [navHeight, setNavHeight] = useState(0);
  const { data, isLoading, error } = useItems();
  const navigate = useNavigate();

  return (
    <CartLayout navHeight={navHeight}>
      <Header>Cart</Header>
      <HorizontalLine gap={2} />

      <Mobile>
        <CartItems />
      </Mobile>

      <Desktop>
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            textAlign: "left",
            display: "table",
            borderCollapse: "collapse",
          }}
        >
          <div
            style={{
              display: "table-row",
              borderBottom: "1px solid #E2E1E1",
            }}
          >
            <div
              style={{
                display: "table-cell",
                width: "70%",
                borderRight: "2px solid #E2E1E1",
                verticalAlign: "top",
              }}
            >
              <CartText
                style={{ borderBottom: "2px solid #E2E1E1", margin: 0 }}
              >
                Cart
              </CartText>
            </div>
            <div
              style={{
                display: "table-cell",
                width: "30%",
                borderLeft: "2px solid #E2E1E1",
                verticalAlign: "top",
              }}
            >
              <CartSummaryText
                style={{ borderBottom: "2px solid #E2E1E1", margin: 0 }}
              >
                cart summary
              </CartSummaryText>
            </div>
          </div>

          <div style={{ display: "table-row" }}>
            <div
              style={{
                display: "table-cell",
                width: "70%",
                borderRight: "2px solid #E2E1E1",
                verticalAlign: "top",
              }}
            >
              <CartItems />
            </div>
            <div
              style={{
                display: "table-cell",
                width: "30%",
                borderLeft: "2px solid #E2E1E1",
                verticalAlign: "top",
              }}
            >
              <Desktop>
                <Flex gap={2}>
                  <Subtotal>
                    <SubtotalHeader>Subtotal</SubtotalHeader>
                    <Price>{formatCurrency(getTotalCartPrice(cart))}</Price>
                  </Subtotal>

                  <HorizontalLine />

                  <ButtonWrapper>
                    <Button
                      full={true}
                      disabled={!cart.length}
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                    </Button>
                  </ButtonWrapper>
                </Flex>
              </Desktop>
            </div>
          </div>
        </div>
      </Desktop>

      <Mobile>
        <CartSummary />
      </Mobile>

      <Mobile>
        <OrderSummary />
      </Mobile>

      <Desktop>
        <SavedItems />
      </Desktop>

      <Desktop>
        <Recommended data={data} isLoading={isLoading} error={error} />
      </Desktop>

      <ButtomNav setNavHeight={setNavHeight} />
    </CartLayout>
  );
}

export default Cart;
