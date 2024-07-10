import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";

import { formatCurrency } from "../utils/helpers";
import activeHeart from "../assets/icons/active-heart.svg";
import heart from "../assets/icons/white-heart.svg";

import Button from "./Button";

const StyledItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  overflow-y: auto;

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
`;

const ItemPrice = styled.p`
  color: var(--secondary-color);
`;

function Item({ item }) {
  const [hoveredIcon, setHoveredIcon] = useState("");

  const imagePath = `/images/${item.name
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")}.png`;

  return (
    <StyledItem>
      <Img src={imagePath} alt={item.name} />
      <ItemDetails>
        <ItemName>{item.name}</ItemName>
        <ItemPrice>{formatCurrency(item.price)}</ItemPrice>
        <Button type="small">Add To Cart</Button>
      </ItemDetails>

      <Icon
        src={
          (hoveredIcon === item.name && activeHeart) || item.isItemSaved
            ? activeHeart
            : heart
        }
        style={{ top: "0.6rem" }}
        alt={item.name}
        onMouseEnter={() => {
          setHoveredIcon(item.name);
        }}
        onMouseLeave={() => {
          setHoveredIcon("");
        }}
      />
    </StyledItem>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
