import styled from "styled-components";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

import { useRemoveItemFromCart } from "../../services/cart/useRemoveItemFromCart";
import { useAddToCart } from "../../services/cart/useAddToCart";
import { useCart } from "../../services/cart/useCart";

import Spinner from "./Spinner";

const StyledItemQuantityControl = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.8rem;
`;

const ControlButton = styled.button`
  cursor: pointer;
  line-height: 2.4rem;
  width: 24px;
  height: 24px;
  text-align: center;
  background-color: ${(props) =>
    props.disabled ? "#FF7E084F" : "var(--secondary-color)"};
`;

const NumItems = styled.p`
  width: 24px;
  font-weight: 500;
  text-align: center;
  font-size: 1.6rem;
`;

function ItemQuantityControl({ id }) {
  const { removeItemFromCart, isRemovingItemFromCart } =
    useRemoveItemFromCart();
  const { addToCart, isAddingToCart } = useAddToCart();

  const { cart } = useCart();

  const currentItem = cart?.data?.cart?.items?.find(
    (item) => item?.product?._id === id
  );

  return (
    <StyledItemQuantityControl>
      <ControlButton
        disabled={isAddingToCart || isRemovingItemFromCart}
        onClick={(e) => {
          e.stopPropagation();
          if (!navigator.onLine) return toast.error("No Internet Access");
          removeItemFromCart(id);
        }}
      >
        -
      </ControlButton>
      {isAddingToCart || isRemovingItemFromCart ? (
        <Spinner />
      ) : (
        <NumItems>{currentItem?.quantity}</NumItems>
      )}
      <ControlButton
        disabled={isAddingToCart || isRemovingItemFromCart}
        onClick={(e) => {
          e.stopPropagation();
          if (!navigator.onLine) return toast.error("No Internet Access");
          addToCart(id);
        }}
      >
        +
      </ControlButton>
    </StyledItemQuantityControl>
  );
}

ItemQuantityControl.propTypes = {
  id: PropTypes.any,
};

export default ItemQuantityControl;
