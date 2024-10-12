import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { getItemQuantity, removeFromCart } from "../../features/cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";

import remove from "../../assets/icons/delete.svg";

import ItemQuantityControl from "../ItemQuantityControl";

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;

  @media only screen and (min-width: 1201px) {
    width: 97%;
    padding: 0;
    margin-top: 1rem;
    margin-right: auto;

    &:not(:last-child) {
      border-bottom: 1px solid #e2e1e1;
    }
  }
`;

const Img = styled.img`
  width: 108px;
  height: 102px;
  border-radius: 13px;
`;

const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.2rem;

  & p:nth-of-type(2) {
    font-size: 1.1rem;
    font-weight: 400;
    color: #bec0bf;
  }

  & p:nth-of-type(3) {
    font-weight: 400;
    line-height: 1.6rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  cursor: default;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const IconText = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--secondary-color);
  text-transform: capitalize;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.4rem;
  letter-spacing: 0.005rem;
`;

const Price = styled.p`
  font-size: 2rem;
  font-weight: 500;
  color: var(--secondary-color);
`;

const Discount = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: #bec0bf;
  text-decoration: line-through;
`;

function CartItem({ item }) {
  const cart = useSelector((state) => state.cart.cart);
  const { totalPrice, name, discount, image, id } = item;
  const dispatch = useDispatch();

  return (
    <Item>
      <DetailsWrapper>
        <Img src={image} alt={name} />
        <Details>
          <p>{name}</p>
          <p>{item.inStock ? "In Stock" : "Out of Stock"}</p>
          <IconWrapper onClick={() => dispatch(removeFromCart(id))}>
            <Icon src={remove} alt="remove-icon" />
            <IconText>remove</IconText>
          </IconWrapper>
        </Details>
      </DetailsWrapper>

      <Summary>
        <Price>{formatCurrency(+totalPrice)}</Price>
        <Discount>
          {formatCurrency(getItemQuantity(cart, id) * +discount)}
        </Discount>
        <ItemQuantityControl
          id={id}
          disabled={getItemQuantity(cart, id) === 1}
        />
      </Summary>
    </Item>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
