import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useCart } from "../../services/cart/useCart";

import ErrorMessage from "../../ui/components/ErrorMessage";
import Skeleton from "../../ui/components/Skeleton";

const Summary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  line-height: 2.6rem;
  gap: 2.4rem;
`;

const Header = styled.p`
  width: 100%;
  padding: 1rem 2rem;

  font-size: 1.6rem;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
`;

const Subtotal = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
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

function CartSummary() {
  const { cart, isLoading, error } = useCart();

  return (
    <Summary>
      {isLoading ? (
        <>
          <Skeleton width={150} height={20} style={{ marginLeft: "2rem" }} />
          <Subtotal>
            <Skeleton width={150} height={15} />
            <Skeleton width={150} height={15} />
          </Subtotal>
        </>
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <Header>Cart Summary</Header>
          <Subtotal>
            <SubtotalHeader>Subtotal</SubtotalHeader>
            <Price>{formatCurrency(cart?.data?.cart?.totalPrice)}</Price>
          </Subtotal>
        </>
      )}
    </Summary>
  );
}

export default CartSummary;
