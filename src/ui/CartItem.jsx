import styled from "styled-components";
import PropTypes from "prop-types";

import remove from "../assets/icons/delete.svg";
import { formatCurrency } from "../utils/helpers";

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

const Control = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.8rem;
`;

const ControlButton = styled.p`
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

function CartItem({ item }) {
  const imagePath = `/images/${item.name
    .toLowerCase()
    .replaceAll(" ", "-")}.png`;

  return (
    <Item>
      <DetailsWrapper>
        <Img src={imagePath} alt={item.name} />
        <Details>
          <p>{item.name}</p>
          <p>{item.inStock ? "In Stock" : "Out of Stock"}</p>
          <IconWrapper>
            <Icon src={remove} alt="remove-icon" />
            <IconText>remove</IconText>
          </IconWrapper>
        </Details>
      </DetailsWrapper>

      <Summary>
        <Price>{formatCurrency(Math.ceil(+item.price - +item.discount))}</Price>
        <Discount>{formatCurrency(+item.price)}</Discount>
        <Control>
          <ControlButton disabled={true}>-</ControlButton>
          <NumItems>1</NumItems>
          <ControlButton>+</ControlButton>
        </Control>
      </Summary>
    </Item>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
