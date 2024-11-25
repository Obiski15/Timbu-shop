import styled from "styled-components";

import { useOrder } from "../services/order/useOrder";

import ProfilePagesLayout from "../ui/layouts/ProfilePagesLayout";
import DummyOrderItem from "../ui/layouts/dummy/DummyOrderItem";
import ErrorMessage from "../ui/components/ErrorMessage";
import Pagination from "../ui/components/Pagination";
import OrderItem from "../features/order/OrderItem";

const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

function Orders() {
  const { isLoading, data, error } = useOrder();

  return (
    <ProfilePagesLayout>
      <OrdersWrapper>
        {isLoading ? (
          Array.from({ length: 2 }, (_, i) => <DummyOrderItem key={i + 1} />)
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <>
            {data?.data?.orders?.map((order, i) => (
              <OrderItem key={i + 1} order={order} />
            ))}
            <Pagination />
          </>
        )}
      </OrdersWrapper>
    </ProfilePagesLayout>
  );
}

export default Orders;
