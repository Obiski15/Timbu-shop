import { TbTruckDelivery } from "react-icons/tb";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { forwardRef } from "react";

import { useDeliveryContext } from "../../providers/delivery/useDeliveryContext";
import { formatCurrency, formatShortDate } from "../../utils/helpers";
import { useCart } from "../../services/cart/useCart";
import { useModal } from "../../hooks/useModal";

import ErrorMessage from "../../ui/components/ErrorMessage";
import Spinner from "../../ui/components/Spinner";

const StyledEditDeliveryMode = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding: 0 0 1rem 0;
`;

const Radio = styled.input`
  width: 20px;
  height: 20px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.3rem;
`;

const DeliveryMode = styled.p`
  & > span {
    font-weight: 600;
  }
`;

const DeliveryTimeline = styled.p`
  font-size: 1.2rem;

  & > span {
    font-weight: 600;
  }
`;

const Shipment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ShipmentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  text-transform: capitalize;

  & > p {
    &:last-child {
      color: var(--border);
    }
  }
`;

const ShipmentWrapper = styled.div`
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
`;
const ItemImage = styled.div`
  width: 5rem;
  height: 5rem;

  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.2rem;
`;

const EditDeliveryMode = forwardRef((_, ref) => {
  const { closeModal } = useModal();
  const { deliveryMode, setDeliveryMode } = useDeliveryContext();

  const { cart, isLoading, error } = useCart();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      deliveryMode,
    },
  });

  function onSubmit(data) {
    setDeliveryMode(data.deliveryMode);
    closeModal();
  }

  return (
    <div>
      <StyledEditDeliveryMode onSubmit={handleSubmit(onSubmit)}>
        <LeftContainer>
          <Radio
            type="radio"
            value="door delivery"
            name="deliveryMode"
            {...register("deliveryMode", {
              required: true,
            })}
          />
          <Details>
            <DeliveryMode>
              <span>Door delivery</span> {`(from ${formatCurrency(1)})`}
            </DeliveryMode>
            <DeliveryTimeline>
              Delivery Between {formatShortDate(new Date())} and{" "}
              {formatShortDate(
                new Date(new Date().getTime() + 24 * 3 * 60 * 60 * 1000)
              )}
            </DeliveryTimeline>
          </Details>
        </LeftContainer>

        <TbTruckDelivery
          fill="var(--secondary-color)"
          color="var(--secondary-color)"
        />

        <button hidden ref={ref}></button>
      </StyledEditDeliveryMode>

      <Shipment>
        <ShipmentHeader>
          <p>
            shipment{" "}
            {`${cart?.data?.cart?.items?.length || 0}/${
              cart?.data?.cart?.items?.length || 0
            }`}
          </p>
          <p>fulfilled by ruvid store</p>
        </ShipmentHeader>

        <ShipmentWrapper>
          <DeliveryMode>
            <span>Door delivery</span>
          </DeliveryMode>
          <DeliveryTimeline>Delivery between 3-5 working days</DeliveryTimeline>

          <Items>
            {isLoading ? (
              <div style={{ margin: "auto" }}>
                <Spinner />
              </div>
            ) : error ? (
              <ErrorMessage message={error.message} />
            ) : !cart?.data?.cart?.items?.length ? (
              <p>Cart is empty 😀</p>
            ) : (
              cart?.data?.cart?.items?.map((item, i) => (
                <Item key={i + 1}>
                  <ItemImage>
                    <img src={item?.product?.photo} alt={item?.product?.name} />
                  </ItemImage>

                  <ItemDetails>
                    <p>{item?.product?.name}</p>
                    <p>QTY: {item?.quantity}</p>
                  </ItemDetails>
                </Item>
              ))
            )}
          </Items>
        </ShipmentWrapper>
      </Shipment>
    </div>
  );
});

EditDeliveryMode.displayName = "EditDeliveryMode";

export default EditDeliveryMode;
