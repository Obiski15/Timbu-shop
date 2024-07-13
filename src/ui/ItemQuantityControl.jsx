import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  dec,
  getItemQuantity,
  inc,
  removeFromCart,
} from "../features/cart/cartSlice";

const Control = styled.div`
  width: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.8rem;
`;

const ControlButton = styled.button`
  cursor: default;
  line-height: 2.4rem;
  width: 24px;
  height: 24px;
  text-align: center;
  background-color: ${(props) =>
    props.disabled ? "#FF7E084F" : "var(--secondary-color)"};
`;

const NumItems = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
`;

function ItemQuantityControl({ id, disabled }) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  return (
    <div>
      <Control>
        <ControlButton
          disabled={disabled}
          onClick={(e) => {
            getItemQuantity(cart, id) === 1
              ? dispatch(removeFromCart(id))
              : dispatch(dec(id));
            e.stopPropagation();
          }}
        >
          -
        </ControlButton>
        <NumItems>{getItemQuantity(cart, id)}</NumItems>
        <ControlButton
          onClick={(e) => {
            dispatch(inc(id));
            e.stopPropagation();
          }}
        >
          +
        </ControlButton>
      </Control>
    </div>
  );
}

ItemQuantityControl.propTypes = {
  id: PropTypes.any,
  disabled: PropTypes.bool,
};

export default ItemQuantityControl;
