import styled from "styled-components";

import { useCart } from "../services/cart/useCart";

import HorizontalItemsContainer from "../features/items/HorizontalItemsContainer";
import ItemsContainer from "../features/items/ItemsContainer";
import OrderSummary from "../features/checkout/OrderSummary";
import ErrorMessage from "../ui/components/ErrorMessage";
import SavedItems from "../features/items/SavedItems";
import EmptyCart from "../features/cart/EmptyCart";
import CartItems from "../features/cart/CartItems";
import CartLayout from "../ui/layouts/CartLayout";

const Desktop = styled.div`
  display: none;

  @media only screen and (min-width: 992px) {
    width: 100%;
    display: block;
  }
`;

const Mobile = styled.div`
  width: 100%;
  display: block;

  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

const CartHeader = styled.p`
  border-bottom: 1px solid var(--border);
  text-transform: capitalize;
  font-weight: 600;
  font-size: 2.4rem;
  line-height: 3rem;
`;

const SummaryHeader = styled(CartHeader)`
  padding-left: 2rem;
`;

const Table = styled.div`
  width: 100%;
  display: table;
  border-collapse: collapse;
  text-align: left;
`;

const TableRow = styled.div`
  display: table-row;
`;

const TableLeft = styled.div`
  display: table-cell;
  width: 70%;
  vertical-align: top;
  border-right: 1px solid var(--border);
  padding-left: 2rem;
`;

const TableRight = styled.div`
  display: table-cell;
  width: 30%;
  vertical-align: top;
  border-left: 1px solid var(--border);
  padding-right: 2rem;
`;

function Cart() {
  const { cart, isLoading: isLoadingCart, error: cartError } = useCart();

  return (
    <CartLayout>
      <Mobile>
        <CartItems />
      </Mobile>

      <Desktop>
        {cartError ? (
          <ErrorMessage message={cartError.message} />
        ) : !isLoadingCart && !cart?.data?.cart?.items?.length ? (
          <EmptyCart />
        ) : (
          <Table>
            <TableRow>
              <TableLeft>
                <CartHeader>Cart</CartHeader>
              </TableLeft>
              <TableRight>
                <SummaryHeader>cart summary</SummaryHeader>
              </TableRight>
            </TableRow>

            <TableRow>
              <TableLeft>
                <CartItems />
              </TableLeft>

              <TableRight>
                <OrderSummary />
              </TableRight>
            </TableRow>
          </Table>
        )}
      </Desktop>

      <Mobile>
        <OrderSummary />
      </Mobile>

      <SavedItems />

      <Desktop>
        <ItemsContainer heading="Top picks for you" limit={10} />
        <HorizontalItemsContainer heading="trending" />
      </Desktop>
    </CartLayout>
  );
}

export default Cart;
