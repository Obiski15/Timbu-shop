import styled from "styled-components";
import PropTypes from "prop-types";

import { useImageIntersection } from "../../hooks/useImageIntersection";

const StyledOrderItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: auto;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
`;

const Image = styled.div`
  width: 100px;
  height: 100px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const MainWrapper = styled.div`
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const NameIdWrapper = styled.div`
  text-transform: capitalize;
  font-weight: 500;
`;

const StatusDatewrapper = styled.div`
  font-size: 1.2rem;
`;

const Name = styled.p`
  word-spacing: 0.1rem;
`;

const Id = styled.p`
  color: #75757a;
  font-size: 1.2rem;
`;

const Status = styled.p`
  text-transform: uppercase;
  text-align: center;
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
  color: #ffffff;

  background-color: ${(props) =>
    props.status === "delivered"
      ? "#6dbd28"
      : props?.status?.startsWith("cancelled")
      ? "#75757a"
      : props.status === "processing"
      ? "#d2d242"
      : ""};
`;

const OrderDate = styled.p`
  font-weight: 500;
  text-transform: capitalize;
`;

function OrderItem({ order }) {
  const { isImageIntersecting, ref } = useImageIntersection();

  return (
    <StyledOrderItem ref={ref}>
      <Image>
        <img
          src={isImageIntersecting ? order?.image : "/dummy_item_image.png"}
          alt={order?.name}
        />
      </Image>
      <MainWrapper>
        <NameIdWrapper>
          <Name>{order?.name}</Name>
          <Id>order id: {order?._id}</Id>
        </NameIdWrapper>
        <StatusDatewrapper>
          <Status status={order?.status}>{order?.status}</Status>
          <OrderDate>on {new Date().getDate()}</OrderDate>
        </StatusDatewrapper>
      </MainWrapper>
    </StyledOrderItem>
  );
}

export default OrderItem;

OrderItem.propTypes = {
  order: PropTypes.object,
};
