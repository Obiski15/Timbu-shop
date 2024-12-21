import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

import { useCart } from "../services/cart/useCart";
import { useUser } from "../services/user/useUser";

import EmptyCartCheckout from "../features/checkout/EmptyCartCheckout";
import DeliveryDetails from "../features/checkout/DeliveryDetails";
import FullPageSpinner from "../ui/components/FullPageSpinner";
import CheckoutLayout from "../ui/layouts/CheckoutLayout";
import ErrorMessage from "../ui/components/ErrorMessage";
import CartSummary from "../features/cart/CartSummary";
import EmptyCart from "../features/cart/EmptyCart";
import CartItems from "../features/cart/CartItems";
import Pay from "../features/checkout/Pay";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  &:first-child {
    @media only screen and (min-width: 992px) {
      flex-direction: row;
    }
  }
`;

const ItemDetails = styled.div`
  width: 100%;
`;

const ItemDetailsHeader = styled.p`
  padding: 1rem 2rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: 1px solid var(--border);

  @media only screen and (min-width: 992px) {
    padding: 1rem 0;
  }
`;

function Checkout() {
  const { cart, error: cartError, isLoading: isLoadingCart } = useCart();
  const { user, isLoadingUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.data && !isLoadingUser) navigate("/login");
  }, [user, navigate, isLoadingUser]);

  if (!user?.data || isLoadingUser) return <FullPageSpinner />;

  return (
    <CheckoutLayout>
      <Wrapper>
        <DeliveryDetails />

        {!isLoadingCart && cartError ? (
          <ErrorMessage message={cartError.message} />
        ) : !isLoadingCart && !cart?.data?.cart?.items?.length ? (
          <EmptyCart />
        ) : (
          <ItemDetails>
            <ItemDetailsHeader>Item Details</ItemDetailsHeader>
            <CartItems />
          </ItemDetails>
        )}
      </Wrapper>

      <Wrapper>
        {!isLoadingCart && cartError ? (
          <ErrorMessage message={cartError.message} />
        ) : !isLoadingCart && !cart?.data?.cart?.items?.length ? (
          <EmptyCartCheckout />
        ) : (
          <>
            <CartSummary />

            <Pay />
          </>
        )}
      </Wrapper>
    </CheckoutLayout>
  );
}

export default Checkout;
