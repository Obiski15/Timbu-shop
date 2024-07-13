import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import activeHeart from "../assets/icons/active-heart.svg";
import { addToCart } from "../features/cart/cartSlice";
import heart from "../assets/icons/white-heart.svg";
import { formatCurrency } from "../utils/helpers";
import { CURRENCY } from "../utils/constants";

import ItemQuantityControl from "./ItemQuantityControl";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const StyledItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  cursor: default;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 102px;
  border-radius: 8px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 1rem;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.6rem;
`;

const ItemName = styled.p`
  text-transform: capitalize;
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-overflow: ellipsis;
  width: 10.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ItemPrice = styled.p`
  color: var(--secondary-color);
`;

function Item({ item }) {
  const { id, name, photos, current_price } = item;

  const cart = useSelector((state) => state.cart.cart);
  const [hoveredIcon, setHoveredIcon] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const image = `https://api.timbu.cloud/images/${photos?.[0]?.url}`;
  const price = current_price?.[0]?.[CURRENCY]?.[0];
  const discount = 300;

  return (
    <StyledItem
      onClick={() => {
        navigate(`/${name}/${id}`);
      }}
    >
      <Img src={image} alt={name} />
      <ItemDetails>
        <ItemName>{name}</ItemName>
        <ItemPrice>{formatCurrency(price)}</ItemPrice>
        {cart.find((product) => product.id === id) ? (
          <ItemQuantityControl id={id} />
        ) : (
          <Button
            type="small"
            onClick={(e) => {
              dispatch(
                addToCart({
                  id,
                  name,
                  price,
                  discount,
                  totalPrice: price - discount,
                  quantity: 1,
                  image,
                })
              );
              e.stopPropagation();
            }}
          >
            Add To Cart
          </Button>
        )}
      </ItemDetails>

      <Icon
        src={
          (hoveredIcon === id && activeHeart) || item.isItem
            ? activeHeart
            : heart
        }
        style={{ top: "0.6rem" }}
        alt={name}
        onMouseEnter={() => {
          setHoveredIcon(id);
        }}
        onMouseLeave={() => {
          setHoveredIcon("");
        }}
        onClick={() => {}}
      />
    </StyledItem>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  wishlist: PropTypes.array,
  setWishlist: PropTypes.func,
};

export default Item;
